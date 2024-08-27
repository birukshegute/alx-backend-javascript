import loadDB from '../utils';

const MAJORS = ['CS', 'SWE'];

class StudentsController {
  static getAllStudents(req, res) {
    const dbPath = process.argv[2] || '';

    loadDB(dbPath)
      .then((groups) => {
        const parts = ['This is the list of our students'];
        const cmp = (a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: 'base' });

        for (const [field, group] of Object.entries(groups).sort(cmp)) {
          parts.push(`Number of students in ${field}: ${group.length}. List: ${group.map((s) => s.firstname).join(', ')}`);
        }
        res.status(200).send(parts.join('\n'));
      })
      .catch((err) => res.status(500).send(err.message));
  }

  static getAllStudentsByMajor(req, res) {
    const dbPath = process.argv[2] || '';
    const { major } = req.params;

    if (!MAJORS.includes(major)) return res.status(500).send('Major parameter must be CS or SWE');

    loadDB(dbPath)
      .then((groups) => {
        const group = groups[major];
        const responseText = group ? `List: ${group.map((s) => s.firstname).join(', ')}` : '';
        res.status(200).send(responseText);
      })
      .catch((err) => res.status(500).send(err.message));
  }
}

export default StudentsController;
module.exports = StudentsController;
