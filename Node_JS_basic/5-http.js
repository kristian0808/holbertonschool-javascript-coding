const http = require('http');
const url = require('url');
const countStudents = require('./3-read_file_async');

const app = http.createServer((request, response) => {
    const path = url.parse(request.url).pathname;

    if (path === '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello Holberton School!');
    } else if (path === '/students') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('This is the list of our students\n');

        countStudents(process.argv[2])
            .then((data) => {
                response.write(`Number of students: ${data.students.length}\n`);
                for (const field in data.subjects) {
                    if (Object.prototype.hasOwnProperty.call(data.subjects, field)) {
                        response.write(`Number of students in ${field}: ${data.subjects[field].length}. List: ${data.subjects[field].join(', ')}\n`);
                    }
                }
                response.end();
            })
            .catch((error) => {
                response.write(`Cannot load the database\n`);
                response.end();
            });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

app.listen(1245);

module.exports = app;
