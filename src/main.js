const esClient = require('./es-client');

const bulkCreate = async () => {
    const students = [
        {
            id: 1,
            first_name: 'Jack',
            last_name: 'Doe',
            skills: {
                react: '70',
                js: '80',
                vue: '30'
            }
        },
        {
            id: 2,
            first_name: 'Bob',
            last_name: 'Burk',
            skills: {
                react: '10',
                js: '20',
                vue: '50'
            }
        }
    ];
    const bulkCommands = [];

    students.forEach(student => {
        bulkCommands.push(
            {
                index: {
                    _index: 'test_index',
                    _type: 'students',
                    _id: student.id
                }
            },
            student
        );
    });

    const result = await esClient.bulk({
        body: bulkCommands
    });

    console.log(result);
};
const getAll = async () => {
    const response = await esClient.search({
        index: 'test_index'
    });
    const students = response.hits.hits;

    console.log(JSON.stringify(students, null, '  '));
};

// bulkCreate();

getAll();
