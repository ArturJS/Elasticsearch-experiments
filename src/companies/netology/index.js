const _ = require('lodash');

module.exports = {
    getConvertedData
};

const convertedData = getConvertedData();

console.log('convertedData', convertedData);

function getConvertedData() {
    const {
        user_test,
        homework,

        // unknown data formats
        users,
        resources
    } = getRawData();
    const getSkills = ({ user_id, user_test, homework, resources }) => {
        const relatedHomeworks = homework.filter(
            item => item.user_id === user_id
        );
        const relatedTests = user_test.filter(item => item.user_id === user_id);
        const getResouceById = id => resources.find(item => item.id === id);
        const calcScoreForHomework = ({ score }) =>
            score === 'good' ? 100 : 50;
        const calcScoreForTest = ({ status, solutions_count }) => {
            if (status === 'passed') {
                return 50 / solutions_count + 50;
            } else if (status === 'in_progress') {
                return 50;
            } else {
                return 0;
            }
        };
        const addScoreToSkill = (skill, score) => {
            skill.sum += score;
            skill.count++;
        };
        const skillsWithScores = _.chain([...relatedHomeworks, ...relatedTests])
            .map(item => {
                const isHomework = !!item.score;

                return {
                    score: isHomework
                        ? calcScoreForHomework(item)
                        : calcScoreForTest(item),
                    skills: getResouceById(item.resource_id).skills
                };
            })
            .reduce((acc, item) => {
                item.skills.forEach(skillName => {
                    if (!acc[skillName]) {
                        acc[skillName] = {
                            sum: 0,
                            count: 0
                        };
                    }

                    addScoreToSkill(acc[skillName], item.score);
                });

                return acc;
            }, {})
            .mapValues((item, key) => item.sum / item.count)
            .value();

        return skillsWithScores;
    };

    return users.map(({ id, first_name, last_name }) => {
        return {
            id,
            first_name,
            last_name,
            skills: getSkills({
                user_id: id,
                user_test,
                homework,
                resources
            })
        };
    });
}

function getRawData() {
    return {
        user_test: [
            {
                id: 1,
                lesson_test_id: 1,
                user_id: 1,
                status: 'in_progress',
                solutions_count: 1,
                resource_id: 1
            },
            {
                id: 2,
                lesson_test_id: 2,
                user_id: 1,
                status: 'passed',
                solutions_count: 2,
                resource_id: 1
            }
        ],
        homework: [
            {
                id: 1,
                status: 'accepted',
                score: 'good',
                user_id: 1,
                lesson_task_id: 1,
                resource_id: 2
            }
        ],

        // unknown data formats
        users: [
            {
                id: 1,
                first_name: 'Jack',
                last_name: 'Doe'
            }
        ],
        resources: [
            {
                id: 1,
                title: 'Lesson 1',
                skills: ['reactjs']
            },
            {
                id: 2,
                title: 'Lesson 2',
                skills: ['nodejs']
            }
        ]
    };
}
