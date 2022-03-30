const router = require('express').Router();
const { Skill } = require('../../models');

router.get('/', (req, res) => {
    Skill.findAll({
        attributes: ['id', 'skill_name', 'skill_type'],
    })
    .then(dbSkillData => res.json(dbSkillData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Skill.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'skill_name', 'skill_type']
    })
    .then(dbSkillData => {
        if (!dbSkillData) {
            res.status(404).json({ message: 'No Skill found with this id' });
            return;
        }
        res.json(dbSkillData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Skill.create({
        skill_name: req.body.skill_name,
        skill_type: req.body.skill_type
    })
    .then(dbSkillData => res.json(dbSkillData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Skill.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
        })
        .then(dbSkillData => {
            if (!dbSkillData) {
            res.status(404).json({ message: 'No Skill found with this id' });
            return;
            }
            res.json(dbSkillData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;