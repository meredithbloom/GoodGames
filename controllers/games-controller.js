const express = require('express');
const games = express.Router()
require('dotenv').config()
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')
const axios = require('axios')

const User = require('../models/users.js');
const Game = require('../models/games.js');

const gameSeed = require('../models/mockgames.js')
const genres = require('../models/genres.js');
const platforms = require('../models/platforms.js')
const gameModes = require('../models/gamemodes.js')

const userController = require('./users-controller.js')
const sessionsController = require('./sessions-controller.js')

// const client_id = process.env.client_id
// const client_secret = process.env.client_secret
// const grant_type = process.env.client_credentials


const isAuthenticated = (req,res,next) => {
  if(req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}



games.use('/users', userController);
games.use('/sessions', sessionsController)
games.use(express.urlencoded({extended:true}));
games.use(methodOverride('_method'));
games.use(express.static('../public'))



//NEW GAME ROUTE
games.get('/new', isAuthenticated, (req,res) => {
  res.render(
    'games/new.ejs',
    {
      currentUser: req.session.currentUser,
      tabTitle: 'Add a Game',
      genres: genres,
      platforms: platforms,
      gameModes: gameModes
    }
  )
})


//CREATE GAME ROUTE (create)
games.post('/', isAuthenticated, (req,res) => {
  Game.create(req.body, (err, addedGame) => {
    res.redirect('/games')
  })
})


//GAME SEED ROUTE
games.get('/seed', (req,res) => {
  Game.create(gameSeed, (err, resetGames) => {
    res.redirect('/games')
  })
})


//GAMES INDEX - will only be visible to user that is logged in
games.get('/', isAuthenticated, (req,res) =>{
  Game.find({}, (err, allGames) => {
    // console.log(allGames)
    res.render(
      'games/index.ejs',
      {
        platforms: platforms,
        tabTitle: 'All Games',
        currentUser: req.session.currentUser,
        isAdmin: req.session.currentUser.isAdmin,
        games: allGames
      }
    )
  })
})

// games.get('/games', isAuthenticated, async (req,res) => {
//   const filters = req.query;
//
// })


//GAME SHOW PAGE
games.get('/:id', isAuthenticated, (req,res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    // console.log(req.session.currentUser)
    res.render(
      'games/show.ejs',
      {
        currentUser: req.session.currentUser,
        isAdmin: req.session.currentUser.isAdmin,
        tabTitle: foundGame.name,
        game: foundGame
      }
    )
  })
})


//EDIT GAME ROUTE - will only be available to user with admin privileges
games.get('/:id/edit', (req,res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    // console.log(req.session.currentUser)
    res.render(
      'games/edit.ejs',
      {
        tabTitle: 'Edit ' + foundGame.name,
        currentUser: req.session.currentUser,
        game: foundGame,
        genres: genres,
        platforms: platforms,
        gameModes: gameModes
      }
    )
  })
})


//UPDATE GAME ROUTE
games.put('/:id', (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundGame) => {
    res.redirect('/games')
  })
})


//GAME DELETE - button will only be visible to users with admin privilege
games.delete('/:id', isAuthenticated, (req, res) => {
  Game.findByIdAndDelete(req.params.id, (err, deletedGame) => {
    res.redirect('/games')
  })
})



module.exports = games
