// const authService = require('../service/user')
const express = require('express')
const passport = require('passport')
const authService = require('../service/auth')
// Create router
var authRouter = express.Router()

// Test
authRouter.get('/', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('dashboard') 
  }
  console.log('Inside the homepage callback function')
  // console.log(req.sessionID)
  res.send(`You got home page!\n`) 
  // window.location.href="../index.html"
})

// CRUD
authRouter.post('/user', async (req, res, next) => {
  try {
    let result = await authService.insertUser(req.body)
    res.send(result)
  } catch (err) {
    return res.status(500).send({
      error: err
    })
  } 
})

authRouter.post('/login', async (req, res, next) => {
    try {
      const {
        email,
        password
      } = req.body 
      await authService.login(email, password)
      console.log(req.session);
      req.session.loggedIn = true
      res.redirect('/dashboard')
    } catch (err) {
      return res.status(500).send({
        error: err
      })
    }
  })

module.exports = authRouter