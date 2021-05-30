const express = require('express')
const path = require('path')

var router = express.Router()

const HTML_PATH = path.join(__dirname + '/../html/')

// Dashboard
router.get('/', (req, res) => {
    if (!req.session.loggedIn) {
      return res.redirect('/login') 
    }
    res.sendFile(path.join(HTML_PATH + 'index.html'));  
})

router.get('/login', (req, res) => {
  res.sendFile(path.join(HTML_PATH + 'login.html')); 
})

router.get('/logout', (req, res) => {
  res.sendFile(path.join(HTML_PATH + 'logout.html')); 
})

module.exports = router