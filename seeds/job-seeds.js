const { Job } = require('../models');

const jobData = [
    {
        title: 'Chief Thief',
        information: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        rate_of_pay: 15000.00,
        employer_id: 1,
        skill_id: 10
    },
    {
        title: 'Apprentice Thief',
        information: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        rate_of_pay: 5000.00,
        employer_id: 1,
        skill_id: 10
    },
    {
        title: 'Assassin in Chief',
        information: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        rate_of_pay: 20000.00,
        employer_id: 2,
        skill_id: 9
    },
    {
        title: 'Apprentice Assassin',
        information: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        rate_of_pay: 10000.00,
        employer_id: 2,
        skill_id: 9
    },
    {
        title: 'Full Stack Developer',
        information: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        rate_of_pay: 55.00,
        employer_id: 3,
        skill_id: 4
    },
    {
        title: 'Agile Thief Team Lead ',
        information: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        rate_of_pay: 1000.00,
        employer_id: 4,
        skill_id: 5
    },
    {
        title: 'Project Manager: Global Domination',
        information: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rate_of_pay: 100000.00,
        employer_id: 5,
        skill_id: 6
    },
    {
        title: 'Sneaky Trick Designer',
        information: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rate_of_pay: 95.00,
        employer_id: 6,
        skill_id: 7
    },
    {
        title: 'Front End Developer',
        information: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        rate_of_pay: 95.00,
        employer_id: 7,
        skill_id: 3
    },
    {
        title: 'Dastardly Database Designer',
        information: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rate_of_pay: 1000.00,
        employer_id: 8,
        skill_id: 9
    },
    {
        title: 'MVC (Mostly Vicious Criminal) Programmer',
        information: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        rate_of_pay: 85.00,
        employer_id: 10,
        skill_id: 10
    },
]

const seedJobs = () => Job.bulkCreate(jobData);

module.exports = seedJobs;