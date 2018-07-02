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
        },
        {
            id: 3,
            first_name: 'Sabrina',
            last_name: 'Galloway',
            skills: {
                react: '50',
                js: '20',
                vue: '100'
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
const getAll = async ({ query, sort }) => {
    const response = await esClient.search({
        index: 'test_index',
        body: {
            query,
            sort
        }
    });
    const students = response.hits.hits;

    console.log(JSON.stringify(students, null, '  '));
};

// bulkCreate();

getAll({
    // query: {
    //     range: {
    //         'skills.react': {
    //             gte: '10'
    //         }
    //     }
    // },
    sort: {
        _script: {
            type: 'number',
            script: {
                lang: 'painless',
                source: `
                    return doc['id'].value;
                `,

                //     source: `
                //     int total = 0;
                //     for (int i = 0; i < params.search_fields.length; ++i) {
                //         total += Integer.parseInt(doc['skills.react'].value);
                //     }
                //     return doc.id.value;
                // `,

                // source: `
                //     return doc['first_name.raw'].length;
                // `,
                params: {
                    search_fields: ['react', 'js', 'vue']
                }
            },
            order: 'asc'
        }
    }
});

// TODO add aggregation of total score by all params
