const User = require('../models');

const userData = [
    {
        username: 'Merlin Magician',
        email: 'merlin@roundtable.org',
        password: '1234',
        skill_id: 1
    },
    {
        username: 'Gandalf Great',
        email: 'gandalf@therings.org',
        password: '1234',
        skill_id: 2
    },
    {
        username: 'Princess Allura',
        email: 'allura@golion.org',
        password: '1234',
        skill_id: 3
    },
    {
        username: 'Mary K Blackwood',
        email: 'mkb@thecastle.org',
        password: '1234',
        skill_id: 4
    },
    {
        username: 'Basil Hawkins',
        email: 'bajiru@majutshushi.org',
        password: '1234',
        skill_id: 5
    },
    {
        username: 'Dorian Pavus',
        email: 'dorian@dragonage.org',
        password: '1234',
        skill_id: 6
    },
    {
        username: 'Glorfindel',
        email: 'glorfindel@therings.org',
        password: '1234',
        skill_id: 7
    },
    {
        username: 'Lina Inverse',
        email: 'lina@inbasu.org',
        password: '1234',
        skill_id: 8
    },
    {
        username: 'The Sorceress',
        email: 'sorceress@grayskull.org',
        password: '1234',
        skill_id: 9
    },{
        username: 'Tiffany Valentine',
        email: 'tiff@childsplay.org',
        password: '1234',
        skill_id: 10
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;