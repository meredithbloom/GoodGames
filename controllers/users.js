const express = require('express');
const router = express.Router()
const methodOverride = require('method-override')


const genres = require('../models/genres.js');
const platforms = require('../models/platforms.js')
const gameModes = require('../models/gamemodes.js')
const User = require('../models/users.js')
// const Game = require('../models/games.js')
// const gameController = require('./controllers/games.js');


router.use(express.urlencoded({extended:true}));
router.use(methodOverride('_method'));




//NEW USER PAGE
router.get('/new', (req,res)=> {
  res.render(
    'users/new.ejs',
    {
      tabTitle: 'Create an Account',
      genres: genres,
      platforms: platforms,
      gameModes: gameModes
    }
  );
})


//CREATE USER ROUTE
router.post('/', (req,res) => {
  // res.send('data received...')
  User.create(req.body, (err, newUser) => {
    res.redirect('/users')
  })
})


// USER INDEX PAGE - PICK YOUR PROFILE //
router.get('/', (req,res) => {
  User.find({}, (err, allUsers) => {
    res.render(
      'users/index.ejs',
      {
        tabTitle: 'Pick your profile',
        users: allUsers
      }
    )
  })
})

//USER SHOW PAGE
router.get('/:id', (req,res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render(
      'users/show.ejs',
      {
        tabTitle: foundUser.username,
        user: foundUser

      }
    )
  })
})


module.exports = router
