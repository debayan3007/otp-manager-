var express = require('express')
const request = require('request')
var router = express.Router()
var http = require("http")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/send', function(req, res, next) {
  const {otp, number} = req.query
  console.log('entered', otp)
  var options = {
    method: 'GET',
    url: `http://2factor.in/API/V1/8d8d5e7e-9bd1-11e8-a895-0200cd936042/SMS/${number}/${otp}`,
    headers: {
      'cache-control': 'no-cache'
    }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  })

  res.send({done: true})
})


module.exports = router
