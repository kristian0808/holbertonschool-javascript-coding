const http = require('http');
const url = require('url');
const countStudents = require('./3-read_file_async');

const app = http.createServer((require, result) => {
  const path = url.parse(require.url).pathname;
  if (path === '/') {
    result.end('Hello Holberton School!');
  } else if (path === '/students') {
    result.write('This is the list of our students\n');
    countStudents(process.argv[2])
      .then((data) => {
        result.write(`Number of students: ${data.students.length}\n`);
        for (const field in data.subjects) {
          if (Object.prototype.hasOwnProperty.call(data.subjects, field)) {
            result.write(`Number of students in ${field}: ${data.subjects[field].length}. List: ${data.subjects[field].join(', ')}\n`);
          }
        }
        result.end();
      })
      .catch((error) => {
        result.end(error.message);
      });
  }
});

app.listen(1245);

module.exports = app;
