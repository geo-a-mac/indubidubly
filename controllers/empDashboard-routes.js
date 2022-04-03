const router = require('express').Router();
const sequelize = require('../config/connection');
const { Employer, Job, User, Skill, } = require('../models');
//onst { withEmpAuth } = require('../utils/auth');

router.get('/', (req, res) => {
    Employer.findAll({
        where: {
            id: req.session.user_id
        },
        attributes: [
            'id',
            'username',
            'email',
            'url'
        ],
        include: [{
            model: Job,
            attributes: ['id', 'title', 'information', 'rate_of_pay', 'skill_id'],
            include: {
                model: Skill,
                attributes: ['skill_name', 'skill_type']
            }
        },
        ]
    })
        .then(dbPostData => {
            const employer = dbPostData[0].get({ plain: true });
            // const jobs = employer.job;
            // const skill = jobs.skill;
            console.log(employer);
            // console.log(jobs);
            // console.log(skill);
            
            res.render('empDashboard', {
                employer,
                // job: employer.job,
                // skill: job.skill,
                loggedIn: req.session.loggedIn,
                
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;

