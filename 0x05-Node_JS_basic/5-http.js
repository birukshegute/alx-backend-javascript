const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const server = http.createServer();
const DB_PATH = process.argv[2] || '';

const getStudents = (path) => new Promise((resolve, reject) => {
  if (!path) reject(new Error('Cannot load the database'));
  fs.readFile(path, (err, data) => {
    if (err) reject(new Error('Cannot load the database'));

    const lines = data.toString().trim().split('\n');
    const fields = lines[0].split(',').slice(0, -1);
    const students = {};

    lines.slice(1).forEach((line) => {
      const values = line.split(',');
      const field = values.pop();
      students[field] = students[field] || [];
      students[field].push(Object.fromEntries(fields.map((key, i) => [key, values[i]])));
    });

    const total = Object.values(students).reduce((acc, group) => acc + group.length, 0);
    const report = [`Number of students: ${total}`];
    Object.entries(students).forEach(([field, group]) => {
      report.push(`Number of students in ${field}: ${group.length}. List: ${group.map((s) => s.firstname).join(', ')}`);
    });

    resolve(report.join('\n'));
  });
});

const routes = {
  '/': (_, res) => {
    const message = 'Hello Holberton School!';
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': message.length });
    res.end(message);
  },
  '/students': (_, res) => {
    getStudents(DB_PATH)
      .then((report) => {
        const message = `This is the list of our students\n${report}`;
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': message.length });
        res.end(message);
      })
      .catch((err) => {
        const message = `This is the list of our students\n${err.message}`;
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': message.length });
        res.end(message);
      });
  },
};

server.on('request', (req, res) => {
  const handler = routes[req.url];
  if (handler) handler(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening at -> http://${HOST}:${PORT}`);
});

module.exports = server;
