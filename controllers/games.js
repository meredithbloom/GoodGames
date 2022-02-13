const express = require('express');
const router = express.Router()
const methodOverride = require('method-override')


const genres = require('../models/genres.js');
const platforms = require('../models/platforms.js')
const gameModes = require('../models/gamemodes.js')
const Game = require('../models/games.js')

router.use(express.urlencoded({extended:false}));
router.use(methodOverride('_method'));


//NEW GAME ROUTE
router.get('/new', (req,res) => {
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
router.post('/', (req,res) => {
  Game.create(req.body, (err, addedGame) => {
    res.redirect('/games')
  })
})


//GAMES INDEX
router.get('/', (req,res) =>{
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
router.get('/:id', (req,res) => {
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
router.get('/:id/edit', (req,res) => {
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
router.put('/:id', (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundGame) => {
    res.redirect('/games')
  })
})


//GAME DELETE
router.delete('/:id', (req, res) => {
  Game.findByIdAndDelete(req.params.id, (err, deletedGame) => {
    res.redirect('/games')
  })
})



module.exports = router
