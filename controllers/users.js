const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Game = require('../models/games.js');
// const userSeed = require('./models/userlist.js');

//INDEX
router.get('/', (req,res) => {
  User.find({}, (err, allUsers) => {
    res.render('users/login.ejs',
      {
        users: allUsers
      }
    )
  });
});

//NEW
router.get('/new', (req,res) => {
  res.render(
    'users/new.ejs',
    {
      tabTitle: 'Create a profile',
      allUsers: userSeed,
      genres: gameGenres,
      platforms: platforms,
      gameModes: gameModes,
    }
  )
});

//CREATE
router.post('/', (req, res) => {
  User.create(req.body, (err, createdUser) => {
    res.redirect('/users')
  })
})

//SHOW
router.get('/:id', (req,res) => {
  User.findById(req.params.id, (err, chosenUser) => {
    res.send(chosenUser)
    res.render(
      '/users.show.ejs',
      {
        user: chosenUser
      }
    );
  });
});

module.exports = router
