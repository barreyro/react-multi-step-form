const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/registrants', (req, res) => {


});

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.listen(process.env.PORT || 8080);

//