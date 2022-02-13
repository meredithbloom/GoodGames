const mongoose = require('mongoose');
const User = require('./users.js')

const gameSchema = mongoose.Schema ({
  name: {type: String, required: true},
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
