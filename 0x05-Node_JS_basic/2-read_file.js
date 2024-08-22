const fs = require('fs');


const countStudents = (filePath) => {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw new Error('Cannot load the database');
  }

  const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
  const [headers, ...data] = lines;
  const fields = headers.split(',').slice(0, -1);

  const groupedStudents = data.reduce((acc, line) => {
    const record = line.split(',');
    const department = record.pop();
    if (!acc[department]) acc[department] = [];
    acc[department].push(Object.fromEntries(fields.map((key, i) => [key, record[i]])));
    return acc;
  }, {});

  const total = Object.values(groupedStudents)
    .reduce((acc, group) => acc + group.length, 0);
  console.log(`Number of students: ${total}`);
  Object.entries(groupedStudents).forEach(([dept, students]) => {
    const studentNames = students.map((s) => s.firstname).join(', ');
    console.log(`Number of students in ${dept}: ${students.length}. List: ${studentNames}`);
  });
};

module.exports = countStudents;
