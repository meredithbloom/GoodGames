//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const session = require('express-session');
require('dotenv').config()


//MODELS
const Game = require('./models/games.js');
const gameController = require('./controllers/games.js');
const gameModes = require('./models/gamemodes.js')
const gameGenres = require('./models/genres.js')
const platforms = require('./models/platforms.js')



const User = require('./models/users.js');
const userController = require('./controllers/users.js')
app.use('/users', userController);
app.use('/games', gameController);



//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
//process.env.PORT references variable defined in env file
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;


//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000



//HOMEPAGE
app.get('/' , (req, res) => {
  res.render('index.ejs');
});




// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
