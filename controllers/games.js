const express = require('express');
const router = express.Router();

const Game = require('../models/games.js');
const gameSeed = require('../models/gameseed.js');
const gameController = require('../controllers/games.js');
const gameModes = require('../models/gamemodes.js')
const gameGenres = require('../models/genres.js')
const platforms = require('../models/platforms.js')



//GAME INDEX
router.get('/', (req,res) => {
  Game.find({}, (err, allGames) => {
    res.render(
      'games/index.ejs',
      {
        games: allGames
      }
    )
  })
})




//GAME SHOW
router.get('/:id', (req,res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    res.render(
      'games/show.ejs',
      {
        game: foundGame
      }
    )
  });
});





module.exports = router;
