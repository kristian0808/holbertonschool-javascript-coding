const http = require('http');
const url = require('url');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;

    if (path === '/') {
        res.end('Hello Holberton School!');
    } else if (path === '/students') {
        res.write('This is the list of our students\n\n'); // Initial line

        countStudents(process.argv[2])
            .then((data) => {
                // No newline here, since it's already on the initial line
                res.write(`Number of students: ${data.students.length}\n`);
                for (const field in data.subjects) {
                    if (data.subjects.hasOwnProperty(field)) {
                        res.write(`Number of students in ${field}: ${data.subjects[field].length}. List: ${data.subjects[field].join(', ')}\n`);
                    }
                }
                res.end();
            })
            .catch((error) => {
                res.end(error.message);
            });
    }
});

app.listen(1245);

module.exports = app;
