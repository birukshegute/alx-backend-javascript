const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const dbFile = process.argv[2] || '';

const countData = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) return reject(new Error('Cannot load the database'));

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return reject(new Error('Cannot load the database'));

    const [headers, ...lines] = data.trim().split('\n');
    const fields = headers.split(',').slice(0, -1);
    const groups = lines.reduce((acc, line) => {
      const [props, field] = [line.split(','), line.split(',').pop()];
      if (!acc[field]) acc[field] = [];
      acc[field].push(Object.fromEntries(fields.map((key, i) => [key, props[i]])));
      return acc;
    }, {});

    const total = Object.values(groups).reduce((sum, grp) => sum + grp.length, 0);
    const report = [`Number of students: ${total}`];
    for (const [field, grp] of Object.entries(groups)) {
      const names = grp.map((s) => s.firstname).join(', ');
      report.push(`Number of students in ${field}: ${grp.length}. List: ${names}`);
    }

    resolve(report.join('\n'));
  });
});

app.get('/', (_, res) => res.send('Hello Holberton School!'));

app.get('/students', (_, res) => {
  countData(dbFile)
    .then((report) => res.send(`This is the list of our students\n${report}`))
    .catch((err) => res.send(`This is the list of our students\n${err.message}`));
});

app.listen(port, () => console.log(`Server listening on PORT ${port}`));

module.exports = app;
