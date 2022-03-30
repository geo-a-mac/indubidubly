const { Skill } = require('../models');

const skillData = [
    {
        skill_name: 'Javascript',
        skill_type: 'Programming Language'
    },
    {
        skill_name: 'C#',
        skill_type: 'Programming Language'
    },
    {
        skill_name: 'Front End Development',
        skill_type: 'Web programming'
    },
    {
        skill_name: 'Back End Development',
        skill_type: 'Web programming'
    },
    {
        skill_name: 'Agile',
        skill_type: 'Developement methodology'
    },
    {
        skill_name: 'Project Management',
        skill_type: 'Project Management'
    },
    {
        skill_name: 'Node.js',
        skill_type: 'Programming'
    },
    {
        skill_name: 'Object-Oriented Programming',
        skill_type: 'Programming'
    },
    {
        skill_name: 'MySQL',
        skill_type: 'Database'
    },
    {
        skill_name: 'Sequelize',
        skill_type: 'Programming'
    },
]

const seedSkills = () => Skill.bulkCreate(skillData);

module.exports = seedSkills;