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
  secret: 'password', // change this!
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// require Post model
var db = require('./models'),
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
app.put('/api/locations/:locationId', controllers.location.update);
//app.get('/api/users', controllers.user.index);


/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.render('index', {user: JSON.stringify(req.user) + " || null"});
});

app.get('/signup', function (req, res) {
  res.render('signup'); // alternative = res.sendFile
});

//Signup new user
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  );
});
//show login view
app.get('/login', function (req, res) {
  res.sendFile('login'); // you can also use res.sendFile
});
// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/'); // sanity check
});
//log out user
function logout(){
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});
}


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
