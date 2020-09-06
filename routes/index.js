var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const response = await axios.get('https://raw.githubusercontent.com/xomrau/trump.rest/quotes/quotes.json');
  const quoteArray = await response.data;
  const quoteArrayLength = quoteArray.length;

  const randomQuote = quoteArray[Math.floor(Math.random() * quoteArrayLength)];
  res.json({ quote: randomQuote });
});

module.exports = router;

//response.data.length.toString())
//https://raw.githubusercontent.com/xomrau/trump.rest/quotes/quotes.json?token=AFH424IQ3AMKWCSYBM6XVH27KONOW