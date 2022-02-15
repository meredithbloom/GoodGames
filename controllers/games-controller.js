const express = require('express');
const games = express.Router()
require('dotenv').config()
const methodOverride = require('method-override')
const sessionsController = require('./sessions-controller.js')

const User = require('../models/users.js');
const userController = require('./users-controller.js')

const genres = require('../models/genres.js');
const platforms = require('../models/platforms.js')
const gameModes = require('../models/gamemodes.js')
const Game = require('../models/games.js')
const bcrypt = require('bcrypt')
const axios = require('axios')
const gameSeed = require('../models/mockgames.js')

const client_id = process.env.client_id
const client_secret = process.env.client_secret
const grant_type = process.env.client_credentials

const isAuthenticated = (req,res) => {
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



//NEW GAME ROUTE
games.get('/new', isAuthenticated, (req,res) => {
  res.render(
    'games/new.ejs',
    {
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
games.get('/seed', isAuthenticated, (req,res) => {
  Game.create(gameSeed, (err, resetGames) => {
    res.redirect('/games')
  })
})
// Game.create(gameSeed, (err, mockGames) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('added provided mock game data')
//   }
// })


//GAMES INDEX
games.get('/', isAuthenticated, (req,res) =>{
  Game.find({}, (err, allGames) => {
    res.render(
      'games/index.ejs',
      {
        tabTitle: 'All Games',
        games: allGames
      }
    )
  })
})


//GAME SHOW PAGE
games.get('/:id', isAuthenticated, (req,res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    res.render(
      'games/show.ejs',
      {
        tabTitle: foundGame.name,
        game: foundGame
      }
    )
  })
})


//EDIT GAME ROUTE
games.get('/:id/edit', isAuthenticated, (req,res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    res.render(
      'games/edit.ejs',
      {
        tabTitle: 'Edit ' + foundGame.name,
        game: foundGame,
        genres: genres,
        platforms: platforms,
        gameModes: gameModes
      }
    )
  })
})


//UPDATE GAME ROUTE
games.put('/:id', isAuthenticated, (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundGame) => {
    res.redirect('/games')
  })
})


//GAME DELETE
games.delete('/:id', isAuthenticated, (req, res) => {
  Game.findByIdAndDelete(req.params.id, (err, deletedGame) => {
    res.redirect('/games')
  })
})



module.exports = games
