const express = require('express');
const games = express.Router()
require('dotenv').config()
const methodOverride = require('method-override')
const sessionsController = require('./sessions_controller.js')

const User = require('../models/users.js');
const userController = require('./users.js')

const genres = require('../models/genres.js');
const platforms = require('../models/platforms.js')
const gameModes = require('../models/gamemodes.js')
const Game = require('../models/games.js')
const bcrypt = require('bcrypt')
const axios = require('axios')


games.use('/users', userController);
games.use('/sessions', sessionsController)
games.use(express.urlencoded({extended:true}));
games.use(methodOverride('_method'));

const client_id = process.env.client_id
const client_secret = process.env.client_secret
const grant_type = process.env.client_credentials



//NEW GAME ROUTE
games.get('/new', (req,res) => {
  res.render(
    'games/new.ejs',
    {
      tabTitle: 'Add a Game',
      currentUser: req.session.currentUser,
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


//GAMES INDEX
games.get('/', (req,res) =>{
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
games.get('/:id', (req,res) => {
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
games.get('/:id/edit', (req,res) => {
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
