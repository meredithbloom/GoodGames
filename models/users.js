const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required:true},
  email: {type: String, required: true},
  img: String,
  genres: [String],
  platforms: [String],
  gameModes: [String]
  // currentlyPlaying: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
  // played: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
  // willPlay: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
