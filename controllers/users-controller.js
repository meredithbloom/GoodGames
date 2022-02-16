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


const isAuthenticated = (req,res,next) => {
  if(req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}


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
      gameModes: gameModes,
      currentUser: req.session.currentUser
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

// USER MY GAMES PAGE
users.get('/:id/mygames', isAuthenticated, (req,res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render(
      'mygames.ejs',
      {
        tabTitle: 'My Games',
        currentUser: req.session.currentUser,
        currentGames: req.session.currentUser.currentlyPlaying,
        pastGames: req.session.currentUser.played,
        futureGames: req.session.currentUser.willPlay
      }
    )
  })
})

//EDIT PROFILE PAGE
users.get('/:id/edit', isAuthenticated, (req,res) => {
  User.findById(req.params.id, (error, foundUser) => {
    res.render(
      'users/edit.ejs',
      {
        tabTitle: 'Edit Profile',
        user: foundUser,
        genres: genres,
        platforms: platforms,
        gameModes: gameModes,
        currentUser: req.session.currentUser
      }
    )
  })
})

// USER SHOW PAGE
users.get('/:id', isAuthenticated, (req,res) => {
  User.findById(req.params.id, (err, foundUser) => {
    // console.log(foundUser);
    res.render(
      'users/show.ejs',
      {
        currentUser: true,
        tabTitle: `${foundUser.username}'s Profile`,
        user: foundUser,
        currentUser: req.session.currentUser
      }
    )
  })
})


//UPDATE PROFILE
users.put('/:id', isAuthenticated, (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundUser) => {
    res.redirect('/users/' + foundUser._id)
  })
})


//USER DELETE
users.delete('/:id', (req,res) => {
  User.findByIdAndDelete(req.params.id, (err, deletedGame) => {
    res.redirect('/sessions/new')
  })
})


module.exports = users
