const router = require('express').Router();
const { User, Skill } = require('../../models');
//const { withUseAuth } = require('../../utils/auth');

//Retrieve all Users
router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'email'],
        include: [
            {
                model: Skill,
                attributes: ['skill_name', 'skill_type'],
                // as: 'user-skill'
                
            }
        ]
    })
    .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Retrieve a specific user by their ID
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'username', 'email'],
        include: [
            {
                model: Skill,
                attributes: ['skill_name', 'skill_type'],
                // as: 'user-skill'
                
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

//Create new User
router.post('/', (req, res) => {
    console.log('body', req.body)
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        skill_id: req.body.skill_id
    })
    .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.skill_id = dbUserData.skill_id;
          req.session.loggedIn = true;
          req.session.userLoggedIn = true;
    
          res.json(dbUserData);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      }); 
});

//Post user info into the session
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.skill_id = dbUserData.skill_id;
        req.session.loggedIn = true;
        req.session.userLoggedIn = true;
    
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
});

//Take user session out
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

//Edit User information
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
        })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete a user by their id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;