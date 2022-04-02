const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Skill, } = require('../models');
const {withUseAuth} = require('../utils/auth');

router.get('/', withUseAuth, (req, res) => {
    User.findAll({
        where: {
            id: req.session.user_id
        },
        attributes: [
            'id',
            'username',
            'email',
            'skill_id'
        ],
        include: [
        {
            model: Skill,
            attributes: ['skill_name', 'skill_type']
        },
    ]
    })
    .then(dbUserData => {
        const user = dbUserData[0].get({ plain: true});
        console.log(user);
       
        res.render('userDashboard', {
            user,

            loggedIn: req.session.loggedIn            
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


module.exports = router;