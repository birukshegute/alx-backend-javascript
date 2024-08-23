const fs = require('fs');


const countStudents = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return reject(new Error('Cannot load the database'));
    }

    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const students = {};

    lines.slice(1).forEach((line) => {
      const values = line.split(',');
      const field = values.pop();
      if (!students[field]) {
        students[field] = [];
      }
      const student = Object.fromEntries(headers.slice(0, -1).map((key, index) => [key, values[index]]));
      students[field].push(student);
    });

    const totalStudents = Object.values(students).reduce((acc, group) => acc + group.length, 0);
    console.log(`Number of students: ${totalStudents}`);
    Object.entries(students).forEach(([field, group]) => {
      const names = group.map((student) => student.firstname).join(', ');
      console.log(`Number of students in ${field}: ${group.length}. List: ${names}`);
    });

    resolve(true);
  });
});

module.exports = countStudents;
