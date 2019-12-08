const express = require('express')
const router = express.Router()

router.get('/list', (req, res, next) => {
  res.json({
    errno: 0,
    data: {
      msg: 'hello express'
    }
  })
})

router.get('/detail', (req, res, next) => {
  res.json({
    errno: 0,
    data: {
      msg: 'this is detail'
    }
  })
})
module.exports = router