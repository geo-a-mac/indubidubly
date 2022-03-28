const router = require('express').Router();
const { route } = require('.');
const { User, Skill } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password', 'skill_id'] },
        // include: [
        //     {
        //         model: Skill,
        //         attributes: ['skill_name', 'skill_type']
        //     }
        // ]
    })
    .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;