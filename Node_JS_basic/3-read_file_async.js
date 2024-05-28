const fs = require('fs').promises;

async function countStudents(path) {
    try {
        const data = await fs.readFile(path, 'utf8');
        const lines = data.split('\n').filter((line) => line.trim() !== '');

        if (lines.length === 0) {
            throw new Error('Cannot load the database');
        }

        const students = lines.slice(1).map((line) => line.split(','));

        const fields = {};
        for (const student of students) {
            const field = student[3];
            const firstname = student[0];

            if (field) {
                if (!fields[field]) {
                    fields[field] = [];
                }
                fields[field].push(firstname);
            }
        }

        return {
            students,
            subjects: fields,
        };
    } catch (error) {
        throw new Error('Cannot load the database');
    }
}

module.exports = countStudents;
