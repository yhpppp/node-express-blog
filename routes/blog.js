const express = require('express')
const router = express.Router()

const { SuccessModel } = require('../model/resModel')

router.get('/list', (req, res, next) => {
  res.json(new SuccessModel({a:1,b:2},'list data'))
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