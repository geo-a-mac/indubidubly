const router = require('express').Router();
const {Employer, Job, Skill } = require('../../models');
const { withEmpAuth } = require('../../utils/auth');

router.get('/', (req, res) =>{
    Job.findAll({
        attributes: ['id', 'title', 'information', 'rate_of_pay', 'employer_id', 'skill_id', 'created_at', 'updated_at'],
        include: [
            {
                model: Employer,
                attributes: ['username', 'email', 'url']
            },
            {
                model: Skill,
                attributes: ['skill_name', 'skill_type']
            }
        ]
    })
    .then(dbJobData => res.json(dbJobData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
}); 

router.get('/:id', (req, res) => {
    Job.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'information', 'rate_of_pay', 'employer_id', 'skill_id', 'created_at', 'updated_at'],
        include: [
            {
                model: Employer,
                attributes: ['username', 'email', 'url']
            },
            {
                model: Skill,
                attributes: ['skill_name', 'skill_type']
            }
        ]
    })
    .then(dbJobData => {
        if (!dbJobData) {
          res.status(404).json({ message: 'No Job found with this id' });
          return;
        }
        res.json(dbJobData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
    Job.create({
        title: req.body.title,
        information: req.body.information,
        rate_of_pay: req.body.rate_of_pay,
        employer_id: req.body.employer_id,
        skill_id: req.body.skill_id,
    })
    .then(dbJobData => res.json(dbJobData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Job.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
        })
        .then(dbJobData => {
            if (!dbJobData) {
            res.status(404).json({ message: 'No job found with this id' });
            return;
            }
            res.json(dbJobData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Job.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbJobData => {
        if (!dbJobData) {
            res.status(404).json({ message: 'No job found with this ID' });
            return;
        }
        res.json(dbJobData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;