const mongoose = require('mongoose');
const Game = require('./games.js')

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, unique: true, required:true},
  password: String,
  email: {type: String, required: true},
  img: {type: String, default: 'https://i.stack.imgur.com/IHLNO.jpg'},
  genres: [String],
  platforms: [String],
  gameModes: [String],
  isAdmin: {type: Boolean, default: false},
  currentlyPlaying: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
  played: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
  willPlay: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}]
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
