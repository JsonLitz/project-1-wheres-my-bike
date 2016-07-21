// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');

var bodyParser = require('body-parser');
// generate a new express app and call it 'app'
var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
