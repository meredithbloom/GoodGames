const bcrypt = require('bcrypt')
const express = require('express');
const users = express.Router()
const methodOverride = require('method-override')
require('dotenv').config()



const genres = require('../models/genres.js');
const platforms = require('../models/platforms.js')
const gameModes = require('../models/gamemodes.js')
const sessionsController = require('./sessions-controller.js')
const User = require('../models/users.js')
const Game = require('../models/games.js')
const gameController = require('./games-controller.js');


const isAuthenticated = (req,res,next) => {
  if(req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}


users.use('/sessions', sessionsController)
users.use(express.urlencoded({extended:true}));
users.use(methodOverride('_method'));



//NEW USER PAGE
users.get('/new', (req,res)=> {
  Game.find({}, (err, allGames) => {
    res.render(
      'users/new.ejs',
      {
        tabTitle: 'Create an Account',
        genres: genres,
        platforms: platforms,
        gameModes: gameModes,
        currentUser: req.session.currentUser,
        games: allGames
      }
    );
  })
})



//CREATE USER ROUTE
users.post('/', (req,res) => {
  // res.send('data received...')
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if(foundUser) {
      res.send('<a href="/users/new">That username is taken. Try again.</a>')
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
      User.create(req.body, (err, newUser) => {
        res.redirect(`/users/${newUser._id}`)
      })
    }
  })
})


// USER MY GAMES PAGE
users.get('/:id/mygames', isAuthenticated, (req,res) => {
  User.findById(req.params.id, (err, foundUser) => {
    Game.find({ _id: {$in: foundUser.currentlyPlaying}} , (error, foundGames) => {
      res.render(
        'users/mygames.ejs',
        {
          tabTitle: 'My Games',
          currentUser: foundUser,
          isAdmin: foundUser.isAdmin,
          games: foundGames
        }
      )
    })
  })
})

//REMOVE GAME FROM USER LIST
// users.delete('/:id/mygames', (req,res) => {
//   User.findById(req.params.id, (err, foundUser) => {
//     //finds user list of games
//     Game.find({ _id: {$in: foundUser.currentlyPlaying}} , (error, foundGames) => {
//       Game.findByIdAndDelete({_id: {$in: foundGames}}, (err, deletedGame) => {
//         res.redirect('/:id/mygames')
//       })
//     })
//   })
// })


//EDIT PROFILE PAGE
users.get('/:id/edit', isAuthenticated, (req,res) => {
  User.findById(req.params.id, (error, foundUser) => {
    Game.find({}, (err, allGames) => {
      Game.find({ _id: {$in: foundUser.currentlyPlaying}} , (error, foundGames) =>{
        res.render(
          'users/edit.ejs',
          {
            tabTitle: 'Edit Profile',
            user: foundUser,
            genres: genres,
            platforms: platforms,
            gameModes: gameModes,
            currentUser: req.session.currentUser,
            allGames: allGames,
            userGames: foundGames
          }
        )
      })
    })
  })
})


// USER SHOW PAGE
users.get('/:id', isAuthenticated, (req,res) => {
  User.findById(req.params.id, (err, foundUser) => {
    Game.find({ _id: {$in: foundUser.currentlyPlaying}} , (error, foundGames) =>{
      // console.log(foundGames)
      res.render(
        'users/show.ejs',
        {
          currentUser: true,
          tabTitle: `${foundUser.username}'s Profile`,
          user: foundUser,
          currentUser: req.session.currentUser,
          games: foundGames
        }
      )
    })
  })
})
    // console.log(foundUser);



//UPDATE PROFILE
users.put('/:id', isAuthenticated, (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundUser) => {
    res.redirect('/users/' + foundUser._id)
  })
})


//USER DELETE
users.delete('/:id', (req,res) => {
  User.findByIdAndDelete(req.params.id, (err, deletedGame) => {
    res.redirect('/sessions/new')
  })
})


module.exports = users
