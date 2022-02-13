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
// const gameSeed = require('./models/gameseed.js');
const gameController = require('./controllers/games.js');
const gameModes = require('./models/gamemodes.js')
const gameGenres = require('./models/genres.js')
const platforms = require('./models/platforms.js')
app.use('/games', gameController);


const User = require('./models/users.js');
const userSeed = require('./models/userlist.js');
const userController = require('./controllers/users.js')
app.use('/users', userController);



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


// //NEW USER
// app.get('/users/new', (req,res) => {
//   res.render(
//     'newuser.ejs',
//     {
//       genres: gameGenres,
//       gameModes: gameModes,
//       platforms: platforms
//     }
//   );
// });
//
// //CREATE USER - add to user database
// app.post('/users', (req,res) => {
//   res.render(req.body)
//   User.create(req.body, (err, newUser) => {
//     res.render(req.body)
//     // res.redirect('/users')
//   });
// });
//
//
// // LOGIN / USER INDEX (SHOW USER - prompt user for input)
// app.get('/users', (req,res) => {
//   User.find({}, (err, allUsers) => {
//     // res.send(allUsers)
//     res.render(
//       'userindex.ejs',
//       {
//         users: allUsers,
//         tabTitle: 'Log-in'
//       }
//     );
//   });
// });
//
//
// // SHOW USER
// app.get('/users/:id', (req,res) => {
//   User.findById(req.params.id, (err, chosenUser) => {
//     // res.send(chosenUser)
//     res.render(
//       'showuser.ejs',
//       {
//         user: chosenUser
//       }
//     );
//   });
// });
//
//
// //GAME SEED ROUTE
//
//
//
//
// //MASTER GAME INDEX
// app.get('/games/index' , (req, res) => {
//   res.render('games/index.ejs')
// });
//
//

//SHOW GAME


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
