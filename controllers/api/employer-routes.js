const router = require('express').Router();
const { Employer, Job, Skill} = require('../../models');

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
        .catch(err =>{
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

router.post('/', (req, res) => {
   Employer.create({
       username: req.body.username,
       email: req.body.email,
       url: req.body.url,
       password: req.body.password,
   })
   .then(dbEmployerData => res.json(dbEmployerData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    }); 
})

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
    
        res.json({ employer: dbEmployerData, message: 'You are now logged in!' });
      });
})

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