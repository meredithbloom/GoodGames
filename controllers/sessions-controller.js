const bcrypt = require('bcrypt')
const express = require('express');
const sessions = express.Router()
const methodOverride = require('method-override')
const mongoose = require('mongoose');
require('dotenv').config()

const User = require('../models/users.js')
const userController = require('./users-controller.js')

// sessions.use('/users', userController);
sessions.use(express.urlencoded({extended:true}));
sessions.use(methodOverride('_method'));


//New session
sessions.get('/new', (req,res) => {
  res.render(
    'sessions/new-session.ejs',
    {
      currentUser: req.session.username,
      tabTitle: 'Log-In'
    }
  )
})

//LOG-IN PATH
sessions.post('/', (req,res) => {
  //step one: look for the username
  User.findOne({username: req.body.username}, (err, foundUser) => {
    //database error case
    if (err) {
      console.log(err)
      res.send('oops, the db had a problem')
    } else if (!foundUser) {
      //if foundUser doesn't exist
      res.send('<a href="/">Sorry, no user found. Click to return to homepage.</a>')
    } else {
      //if user is found, we now need to check if their password matches
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        //add the user to our session
        req.session.currentUser = foundUser
        //redirect to home page
        res.redirect('/users/' + req.session.currentUser._id)
      } else {
        //passwords don't match
        res.send('<a href="/sessions/new"> password does not match. Click to return to log-in page. </a>')
      }
    }
  })
})


sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})


module.exports = sessions
