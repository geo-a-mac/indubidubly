const { Message } = require('../models');

const messageData = [
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 1,
        employer_id: 10
    },
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 2,
        employer_id: 9
    },
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 3,
        employer_id: 8
    },
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 4,
        employer_id: 7
    },
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 5,
        employer_id: 6
    },
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 6,
        employer_id: 5
    },
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 7,
        employer_id: 4
    },
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 8,
        employer_id: 3
    },
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 9,
        employer_id: 2
    },
    {
        message_text: 'Very interested in the job. Good skill match.',
        user_id: 10,
        employer_id: 1
    },
]

const seedMessages = () => Message.bulkCreate(messageData);

module.exports = seedMessages;