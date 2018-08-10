const express = require('express');
const path = require('path')
const request = require('request')

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/send', (req, res) => {
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
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);