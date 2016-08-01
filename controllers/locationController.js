var db = require('../models');
// Nice comments in your code! They're really helpful.

// Watch your indentation. It's important to have well-indented, clean code for readability

// GET /api/locations
function index(req, res) {
  // make sure the current user's id matches this location's user id associated with it (authorized)
  //TODO: Only show posts from req.user
  if(req.user){
    user = req.user;
    // find all locations specifically having the _user matching the logged in user's id
    db.Location.find({_user: user._id}, function(err, locations) {
      res.json(locations);
    });
  }
}

function create(req, res) {
  //TODO: Also get the user's id to put into a new location.
  console.log("LOGGED IN USER: " , req.user);
  var user = req.user;
  var newLocation = new db.Location({
      _user: user._id,
      streetOne: req.body.streetOne,
      streetTwo: req.body.streetTwo,
      noteToSelf: req.body.noteToSelf,
  });
  newLocation.save(function (err, savedLocation) {
    if (err) {
        console.log ('err:', err);
    }
    res.json(savedLocation);
  });
}

function show(req, res) {
  // Maybe you could accomplish this by comparing req.user and foundLocation.user?
  // make sure the current user's id matches this location's user id associated with it (authorized)
  db.Location.findById(req.params.locationId, function(err, foundLocation) {
    if(err) { console.log('locationController.show error', err); }
    console.log('locationController.show responding with', foundLocation);
    res.json(foundLocation);
  });
}

function destroy(req, res) {
  // Like above, you can compare req.user and foundLocation.user
  // make sure the current user's id matches this location's user id associated with it (authorized)
  db.Location.findOneAndRemove({_id: req.params.locationId }, function(err, foundLocation) {
    if(err) { console.log('locationController.show error', err); }
    console.log('location entry was succesfully deleted!', foundLocation);
    res.json(foundLocation);
  });
}

// PUT /api/locations/:id update existing location
function update(req, res) {
  // make sure the current user's id matches this location's user id associated with it (authorized)
  console.log('updating with data', req.body);
  var updateData = req.body;
  var id = req.params.locationId;
  console.log(id + '       id check');
  // Nice use of findByIdAndUpdate!
  db.Location.findByIdAndUpdate(id, updateData, {new: true}, function(err, savedUpdatedLocation) {
    if (err) {
      console.log('locationToUpdate error', err);
    }
    console.log(savedUpdatedLocation);
    res.json(savedUpdatedLocation);
  });
}

module.exports = {
  index: index,
  create: create,
  destroy: destroy,
  show: show,
  update: update
};
