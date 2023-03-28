const express = require('express')
const router = express.Router()

const User = require('../../models/users')


router.use('/', require('./home'))

router.use('/admin', require('./admin'))

router.get("/logout", (req, res) => { 
    req.logout(req.user, err => {
      if(err) return next(err)
      res.redirect("/login")
    })
  })

 

module.exports = router


