const mongoose = require('mongoose');


const gameSchema = mongoose.Schema ({
  name: {type: String, required: true},
  img: {type: String, required: true},
  year: {type: Number},
  publisher: {type: String},
  developer: String,
  platforms: [
    {
      platformName: String,
      logo: String
    }
  ],
  genres: {type: [String]},
  creativeLead: String,
  gameModes: [String]
})


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
