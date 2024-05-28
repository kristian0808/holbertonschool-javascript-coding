const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello Holberton School!');
});

app.get('/students', (request, response) => {
  countStudents(process.argv[2])
    .then(({ students, subjects }) => {
      response.write('This is the list of our students\n');
      response.write(`Number of students: ${students.length}\n`);
      for (const field in subjects) {
        if (field) {
          const list = subjects[field];
          response.write(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}\n`);
        }
      }
      response.end();
    })
    .catch((error) => {
      response.write('This is the list of our students\n');
      response.end(error.message);
    });
});

app.listen(1245);

module.exports = app;
