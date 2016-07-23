// SERVER-SIDE JAVASCRIPT
// require express and other modules
var express = require('express'),
    app = express(),  //generate a new express app and call it 'app'
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
// serve static files from public folder
app.use(express.static(__dirname + '/public'));
// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');
// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'secretkey', // change this!
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// require Post model
var db = require('./models'),
    Post = db.Post;
    User = db.User;

// passport config
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
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
