const mongoose = require('mongoose');
const Game = require('./games.js');


const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required:true},
  email: {type: String, required: true},
  img: String,
  genres: [String],
  platforms: [String],
  gameModes: [String],
  currentlyPlaying: [String],
  played: [String],
  willPlay: [String]
})

const User = mongoose.model('User', userSchema);

module.exports = User;
