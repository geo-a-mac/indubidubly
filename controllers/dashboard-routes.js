const router = require('express').Router();
const sequelize = require('../config/connection');
const { Employer, Job, User, Skills } = require('../models');

router.get('/', (req, res) => {
    Employer.findAll({
        attributes: [
            'id',
            'username',
            'email',
            'url'
        ],
        include: [{
            model: Job,
            attributes: ['id', 'title', 'information', 'rate_of_pay', 'skill_id']
        },
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            console.log("fuck");
            res.render('dashboard', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

