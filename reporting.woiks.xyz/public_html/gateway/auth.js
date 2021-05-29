// const authService = require('../service/user')
const express = require('express')

// Create router
var authRouter = express.Router()

authRouter.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    // console.log(req.sessionID)
    res.send(`You got home page!\n`)
    // window.location.href="../index.html"
  })

