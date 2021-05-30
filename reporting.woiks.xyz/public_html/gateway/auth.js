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

// CREATE
authRouter.post('/user', async (req, res, next) => {
  try {
    let result = await authService.insertUser(req.body)
    res.send(result)
  } catch (err) {
    return res.status(500).send({
      error: err.message || err
    })
  } 
})

// GET ALL
authRouter.get('/user', async (req, res, next) => {
  try {
    if (!req.session.isAdmin) {
      return res.redirect('/') 
    }
    let result = await authService.getAllUsers()
    res.send(result)
  } catch (err) {
    return res.status(500).send({
      error: err.message || err
    })
  } 
})

// GET
authRouter.get('/user/:id', async (req, res, next) => {
  try {
    if (!req.session.isAdmin) {
      return res.redirect('/') 
    }
    let result = await authService.getUserByID(req.params.id)
    if (!result) {
      return res.status(404).send({
        error: "Not Found."
      }) 
    }
    res.send(result)
  } catch (err) {
    return res.status(500).send({
      error: err.message || err
    })
  } 
})

// UPDATE
authRouter.put('/user/:id', async (req, res, next) => {
  try {
    if (!req.session.isAdmin) {
      return res.redirect('/') 
    }
    let result = await authService.updateUser(req.params.id, req.body)
    res.send(result)
  } catch (err) {
    return res.status(500).send({
      error: err.message || err
    })
  } 
})

// DELETE
authRouter.delete('/user/:id', async (req, res, next) => {
  try {
    if (!req.session.isAdmin) {
      return res.redirect('/') 
    }
    await authService.deleteUser(req.params.id)
    res.send({success: true})
  } catch (err) {
    return res.status(500).send({
      error: err.message || err
    })
  } 
})

// LOGIN
authRouter.post('/login', async (req, res, next) => {
    try {
      const {
        email,
        password
      } = req.body 
      let user = await authService.login(email, password)
      req.session.loggedIn = true
      req.session.isAdmin = user.isAdmin
      res.redirect('/dashboard')
    } catch (err) {
      return res.status(500).send({
        error: err.message || err
      })
    }
  })

authRouter.get('/logout', async (req, res, next) => {
  try {
    req.session.loggedIn = false
    req.session.isAdmin = false
    req.session.destroy();
    res.redirect('/')
  } catch (err) {
    return res.status(500).send({
      error: err.message || err
    })
  }
})

module.exports = authRouter