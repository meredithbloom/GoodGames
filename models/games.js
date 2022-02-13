const mongoose = require('mongoose');

const gameSchema = mongoose.Schema ({
  name: {type: String, required: true, unique: true},
  img: {type: String, required: true},
  year: {type: Number},
  publisher: {type: String},
  developer: String,
  platforms: {type: [String]},
  genres: {type: [String]},
  creativeLead: String,
  gameModes: [String]
})


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
