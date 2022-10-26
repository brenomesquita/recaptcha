const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');

const app = express();
const port = 3009;

app.use(express.static('public'));
app.use(bodyParser.json());

const handleSend = (req, res) => {
  const token = req.body.token;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=ENV-PUBLIC&response=${token}`;

  fetch(url, {
    method: 'post'
  })
    .then(response => response.json())
    .then(google_response => res.json({ google_response }))
    .catch(error => res.json({ error }));
};

app.post('/send', handleSend);

app.listen(port, () => console.log(`Listening on port ${port}!`));