const express = require('express')
const performanceService = require('../service/performance')
// Create router
var performanceRouter = express.Router()

performanceRouter.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
          return res.redirect('/login') 
        }
        let result = await performanceService.getAllPerformance()
        res.send(result)
      } catch (err) {
        return res.status(400).send({
          error: err.message || err
        })
      } 
})

module.exports = performanceRouter