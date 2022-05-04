const router = require('express').Router();
const { Employer, Job, Skill } = require('../../models');
//const { withEmpAuth, withUseAuth } = require('../../utils/auth');

// Retrieve all Employer information
router.get('/', (req, res) => {
    Employer.findAll({
        attributes: ['id', 'username', 'email', 'url',],
        include: [
            {
                model: Job,
                attributes: ['title', 'information', 'rate_of_pay'],
                include: {
                    model: Skill,
                    attributes: ['skill_name', 'skill_type']
                }
            }
        ]
    })
        .then(dbEmployerData => res.json(dbEmployerData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Employer.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'username', 'email', 'url',],
        include: [
            {
                model: Job,
                attributes: ['title', 'information', 'rate_of_pay'],
                include: {
                    model: Skill,
                    attributes: ['skill_name', 'skill_type']
                }
            }
        ]
    })
        .then(dbEmployerData => {
            if (!dbEmployerData) {
                res.status(404).json({ message: 'No Employer found with this id' });
                return;
            }
            res.json(dbEmployerData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//Add a new Employer profile
router.post('/', (req, res) => {
   Employer.create({
       username: req.body.username,
       email: req.body.email,
       url: req.body.url,
       password: req.body.password,
   })
   .then(dbEmployerData => {
       req.session.save(() => {
        req.session.user_id = dbEmployerData.id;
        req.session.username = dbEmployerData.username;
        req.session.url = dbEmployerData.url;
        req.session.loggedIn = true;
        req.session.employerLoggedIn = true;
 
        res.json(dbEmployerData);
       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });

});

//Allow Employer to log into their dashboard
router.post('/login', (req, res) => {
    Employer.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbEmployerData => {
        if (!dbEmployerData) {
            res.status(400).json({ message: 'No employer with that email address!' });
            return;
        }

        const validPassword = dbEmployerData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbEmployerData.id;
            req.session.username = dbEmployerData.username;
            req.session.url = dbEmployerData.url;
            req.session.loggedIn = true;

            req.session.employerLoggedIn = true;
    
        res.json({ employer: dbEmployerData, message: 'You are now logged in!' });
      });

    });
});

//Allow Employer to Log out of dashboard
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

//Call data for one specific employer
router.put('/:id', (req, res) => {
    Employer.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbEmployerData => {
            if (!dbEmployerData) {
                res.status(404).json({ message: 'No employer found with this id' });
                return;
            }
            res.json(dbEmployerData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete employer profile
router.delete('/:id', (req, res) => {
    Employer.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbEmployerData => {
            if (!dbEmployerData) {
                res.status(404).json({ message: 'No Employer found with this ID' });
                return;
            }
            res.json(dbEmployerData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;