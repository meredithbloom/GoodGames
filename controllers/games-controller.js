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


// const isAuthenticated = (req,res) => {
//   if(req.session.currentUser) {
//     return next()
//   } else {
//     res.redirect('/sessions/new')
//   }
// }

games.use('/users', userController);
games.use('/sessions', sessionsController)
games.use(express.urlencoded({extended:true}));
games.use(methodOverride('_method'));



//NEW GAME ROUTE
games.get('/new', (req,res) => {
  res.render(
    'games/new.ejs',
    {
      currentUser: true,
      tabTitle: 'Add a Game',
      genres: genres,
      platforms: platforms,
      gameModes: gameModes
    }
  )
})


//CREATE GAME ROUTE (create)
games.post('/', (req,res) => {
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
// Game.create(gameSeed, (err, mockGames) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('added provided mock game data')
//   }
// })


//GAMES INDEX
games.get('/', (req,res) =>{
  Game.find({}, (err, allGames) => {
    res.render(
      'games/index.ejs',
      {
        tabTitle: 'All Games',
        currentUser: true,
        games: allGames
      }
    )
  })
})


//GAME SHOW PAGE
games.get('/:id', (req,res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    res.render(
      'games/show.ejs',
      {
        currentUser: true,
        tabTitle: foundGame.name,
        game: foundGame
      }
    )
  })
})


//EDIT GAME ROUTE
games.get('/:id/edit', (req,res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    res.render(
      'games/edit.ejs',
      {
        tabTitle: 'Edit ' + foundGame.name,
        currentUser: true,
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


//GAME DELETE
games.delete('/:id', (req, res) => {
  Game.findByIdAndDelete(req.params.id, (err, deletedGame) => {
    res.redirect('/games')
  })
})



module.exports = games
