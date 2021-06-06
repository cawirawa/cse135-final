const express = require('express')
const activityService = require('../service/activity')
// Create router
var activityRouter = express.Router()

activityRouter.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
          return res.redirect('/login') 
        }
        let result = await activityService.getAllActivity()
        res.send(result)
      } catch (err) {
        return res.status(400).send({
          error: err.message || err
        })
      } 
})

module.exports = activityRouter