import fs from 'fs';

const loadDB = (path) => new Promise((resolve, reject) => {
  if (!path) return reject(new Error('Cannot load the database'));

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) return reject(new Error('Cannot load the database'));

    const [header, ...lines] = data.trim().split('\n');
    const fields = header.split(',').slice(0, -1);
    const groups = lines.reduce((acc, line) => {
      const [values, key] = [line.split(','), line.split(',').pop()];
      if (!acc[key]) acc[key] = [];
      acc[key].push(Object.fromEntries(fields.map((f, i) => [f, values[i]])));
      return acc;
    }, {});

    resolve(groups);
  });
});

export default loadDB;
module.exports = loadDB;
