const express = require('express')
const staticService = require('../service/static')
// Create router
var staticRouter = express.Router()

staticRouter.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
          return res.redirect('/login') 
        }
        let result = await staticService.getAllStatic()
        res.send(result)
      } catch (err) {
        return res.status(400).send({
          error: err.message || err
        })
      } 
})

module.exports = staticRouter