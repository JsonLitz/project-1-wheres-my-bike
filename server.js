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


/*
 * JSON API Endpoints
 */
 var controllers = require('./controllers');

app.get('/api', controllers.api.index);
app.get('/api/locations', controllers.location.index);
app.get('/api/locations/:locationId', controllers.location.show);
app.post('/api/locations', controllers.location.create);
app.delete('/api/locations/:locationId', controllers.location.destroy);
app.put('/api/locations/:locatonId',controllers.location.update);
// app.get('/api/locations/:locationId', controllers.location.show);
/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');

});
//
// app.get('/api', function homepage (req, res) {
//   // res.sendFile(__dirname + '/views/index.html');
//
// });

app.get('/api', controllers.api.index);



// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
