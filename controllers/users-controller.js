const bcrypt = require('bcrypt')
const express = require('express');
const users = express.Router()
const methodOverride = require('method-override')
require('dotenv').config()



const genres = require('../models/genres.js');
const platforms = require('../models/platforms.js')
const gameModes = require('../models/gamemodes.js')
const sessionsController = require('./sessions-controller.js')
const User = require('../models/users.js')
const Game = require('../models/games.js')
const gameController = require('./games-controller.js');


// const isAuthenticated = (req,res) => {
//   if(req.session.currentUser) {
//     return next()
//   } else {
//     res.redirect('/sessions/new')
//   }
// }


users.use('/sessions', sessionsController)
users.use(express.urlencoded({extended:true}));
users.use(methodOverride('_method'));




//NEW USER PAGE
users.get('/new', (req,res)=> {
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
users.post('/', (req,res) => {
  // res.send('data received...')
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, newUser) => {
    res.redirect('/users/' + newUser._id)
  })
})


// USER INDEX PAGE - PICK YOUR PROFILE //
// users.get('/', (req,res) => {
//   User.find({}, (err, allUsers) => {
//     res.render(
//       'users/index.ejs',
//       {
//         tabTitle: 'Pick your profile',
//         users: allUsers
//       }
//     )
//   })
// })

// USER SHOW PAGE
users.get('/:id', (req,res) => {
  User.findById(req.params.id, (err, foundUser) => {
    console.log(foundUser);
    res.render(
      'users/show.ejs',
      {
        tabTitle: `${foundUser.username}'s Profile`,
        user: foundUser
      }
    )
  })
})

//EDIT PROFILE PAGE
users.get('/:id/edit', (req,res) => {
  User.findById(req.params.id, (error, foundUser) => {
    res.render(
      'users/edit.ejs',
      {
        tabTitle: 'Edit Profile',
        user: foundUser,
        genres: genres,
        platforms: platforms,
        gameModes: gameModes
      }
    )
  })
})


//UPDATE PROFILE
users.put('/:id', (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundUser) => {
    res.redirect('/users')
  })
})


//USER DELETE
users.delete('/:id', (req,res) => {
  User.findByIdAndDelete(req.params.id, (err, deletedGame) => {
    res.redirect('/users')
  })
})


module.exports = users
