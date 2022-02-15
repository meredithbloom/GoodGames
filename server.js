//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const session = require('express-session');
require('dotenv').config()
const bcrypt = require('bcrypt')
const axios = require('axios')


//MODELS
const Game = require('./models/games.js');
const gameController = require('./controllers/games-controller.js');
const gameModes = require('./models/gamemodes.js')
const gameGenres = require('./models/genres.js')
const platforms = require('./models/platforms.js')
const gameSeed = require('./models/mockgames.js')

const sessionsController = require('./controllers/sessions-controller.js')


const User = require('./models/users.js');
const userController = require('./controllers/users-controller.js')



// const isAuthenticated = (req,res) => {
//   if(req.session.currentUser) {
//     return next()
//   } else {
//     res.redirect('/sessions/new')
//   }
// }


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

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)


//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use('/users', userController);
app.use('/games', gameController);
app.use('/sessions', sessionsController)

//___________________
// Routes
//___________________
//localhost:3000

//HOMEPAGE
app.get('/' , (req, res) => {
  res.render('index.ejs');
});




//env variables
// const client_id = process.env.client_id
// const client_secret = process.env.client_secret
// const grant_type = process.env.client_credentials
// const access_token = process.env.access_token
// const token_type = process.env.token_type
// const options = {
//   headers: {
//     'Client-Id': client_id,
//     'Authorization': 'Bearer' access_token
//   }
// }

// axios({
//   method: 'POST',
//   url: 'https://api.igdb.com/v4/games',
//   headers: {
//     'Client-ID': 'x7kxz02uzg5wye8odruj7q87sbkrpi',
//     'Authorization': 'Bearer 8wko9jqct7fnx3ixscjz66qea8838l'
//   },
//   params: {
//     fields: 'name,platforms',
//     _limit:25,
//   }
// })
//   .then(response => {
//     console.log(response.data);
// })
//   .catch(err => {
//     console.log(err);
// });
//
//






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
