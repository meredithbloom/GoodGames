const bcrypt = require('bcrypt')
const express = require('express');
const sessions = express.Router()
const methodOverride = require('method-override')
const mongoose = require('mongoose');
require('dotenv').config()

const User = require('../models/users.js')

sessions.use(express.urlencoded({extended:true}));
sessions.use(methodOverride('_method'));


//New session
sessions.get('/new', (req,res) => {
  res.render(
    'sessions/new.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})



//on Log-in
sessions.post('/', (req,res) => {
  //step one: look for the username
  User.findOne({username: req.body.username}, (err, foundUser) => {
    //database error case
    if (err) {
      console.log(err)
      res.send('oops, the db had a problem')
    } else if (!foundUser) {
      //if foundUser doesn't exist
      res.send('<a href="/">Sorry, no user found </a>')
    } else {
      //if user is found, we now need to check if their password matches
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        //add the user to our session
        req.session.currentUser = foundUser
        //redirect to home page
        res.redirect('/')
      } else {
        //passwords don't match
        res.send('<a href="/"> password does not match </a>')
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
