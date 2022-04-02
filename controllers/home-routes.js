const router = require('express').Router();
const sequelize = require('../config/connection');
const { Employer, Job, Message, Skill, User } = require('../models');


// get all jobs for homepage
router.get('/', (req, res) => {
    Job.findAll({
        attributes: [
            'id',
            'title',
            'information',
            'rate_of_pay',
            'employer_id',
            'skill_id',
            'created_at'
        ],
        include: [
            {
                model: Skill,
                attributes: ['id', 'skill_name', 'skill_type']
            },
            {
                model: Employer,
                attributes: ['id','username','email','url']
            }
        ]
    })
        .then(dbJobData => {
            const job = dbJobData.map(job => job.get({plain:true}));
            res.render('homepage', { job });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});


// get the login page, reroute to home if already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

// get a job by id
router.get('/job/:id', (req, res) => {
    Job.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'information',
            'rate_of_pay',
            'employer_id',
            'skill_id'
        ],
        include: [
            {
                model: Skill,
                attributes: ['id', 'skill_name', 'skill_type'],
                //as: 'jobskill'
            },
            {
                model: Employer,
                attributes: ['id', 'username', 'email', 'url' ]
            }
        ]
    })
        .then(dbJobData => {
            
            if(!dbJobData) {
                res.status(400).json({message: 'No job found with this id'});
                return;
            }
            //serialize data
            const job = dbJobData.get({plain: true});
            console.log(job);
            res.render('job-post', { job, loggedIn: req.session.loggedIn, 
            employer: job.employer, 
            skill: job.skill });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get all skills
router.get('/skills', (req, res) => {
    Skill.findAll({
        include: [
            'id',
            'skill_name',
            'skill_type'
        ]
    })
    .then(dbSkillData => {
        console.log(dbSkillData);
        const skills = dbSkillData.map(skill => skill.get({plain:true}));
        res.render('skills', {skills});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get all employers
router.get('/employers', (req, res) => {
    Employer.findAll({
        attributes: [
            'id',
            'username',
            'email',
            'url'
        ],
        include: [{
            model: Job,
            attributes: ['id', 'title', 'information', 'rate_of_pay', 'skill_id'],
            include: [
                {
                    model: Skill,
                    attributes: ['id', 'skill_name', 'skill_type']
                }
            ]
        },
        
    ]
    })
    .then(dbEmployerData => {
        const employers = dbEmployerData.map(employer => employer.get({plain: true}));
        console.log(employers);
        res.render('employer', { employers, loggedIn: req.session.logedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/employers/:id', (req, res) => {
    Employer.findOne({
        where: {
            id: req.params.id
        },
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
        {
            model: Skill,
            attributes: ['id', 'skill_name', 'skill_type']
        }
    ]
    })
    .then(dbEmployerData => {
        if(!dbEmployerData) {
            res.status(404).json({message: 'No employer found with that id'});
            return;
        }
        const employer = dbEmployerData.get({plain:true});
        res.render('employers', {employer, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;