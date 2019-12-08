const express = require('express')
const router = express.Router()

router.post('/login',(req,res,next) => {
  const { username, password } = req.body
  res.json({
    username,
    password
  })
})



module.exports = router
