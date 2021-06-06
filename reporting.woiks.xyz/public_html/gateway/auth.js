// const authService = require('../service/user')
const express = require('express')
const authService = require('../service/auth')
// Create router
var authRouter = express.Router()

// CRUD

// CREATE
authRouter.post('/', async (req, res, next) => {
  try {
    let result = await authService.insertUser(req.body)
    res.send(result)
  } catch (err) {
    return res.status(400).send({
      error: err.message || err
    })
  } 
})

// GET ALL
authRouter.get('/', async (req, res, next) => {
  try {
    if (!req.session.isAdmin) {
      return res.redirect('/') 
    }
    let result = await authService.getAllUsers()
    res.send(result)
  } catch (err) {
    return res.status(400).send({
      error: err.message || err
    })
  } 
})

// GET
authRouter.get('/:id', async (req, res, next) => {
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
    return res.status(400).send({
      error: err.message || err
    })
  } 
})

// UPDATE
authRouter.patch('/:id', async (req, res, next) => {
  try {
    if (!req.session.isAdmin) {
      return res.redirect('/') 
    }
    let result = await authService.updateUser(req.params.id, req.body)
    res.send(result)
  } catch (err) {
    return res.status(400).send({
      error: err.message || err
    })
  } 
})

// DELETE
authRouter.delete('/:id', async (req, res, next) => {
  try {
    if (!req.session.isAdmin) {
      return res.redirect('/') 
    }
    await authService.deleteUser(req.params.id)
    res.send({success: true})
  } catch (err) {
    return res.status(400).send({
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
      res.cookie('isAdmin', user.isAdmin.toString()).send({
        success: true,
        isAdmin: user.isAdmin 
      })
    } catch (err) {
      return res.status(400).send({
        error: err.message || err
      })
    }
  })


module.exports = authRouter