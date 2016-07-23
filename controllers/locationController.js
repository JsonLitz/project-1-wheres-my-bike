var db = require('../models');

// GET /api/locations
function index(req, res) {
  // FILL ME IN !
    db.Location.find({}, function(err, locations) {
        res.json(locations);
    });
}



function create(req, res) {
    console.log(req.body);

  var newLocation = new db.Location({
      streetOne: req.body.streetOne,
      streetTwo: req.body.streetTwo,
      noteToSelf: req.body.noteToSelf,
    });

    console.log("PRESAVE: ",  newLocation);

  newLocation.save(function (err, savedLocation) {
    if (err) {
        console.log ('err:', err);
    }
    console.log("POSTSAVE: " , savedLocation);
    res.json(savedLocation);
  });
  // console.log(newAlbum.name);

}


function show(req, res) {
  db.Location.findById(req.params.locationId, function(err, foundLocation) {
    if(err) { console.log('locationController.show error', err); }
    console.log('locationController.show responding with', foundLocation);
    res.json(foundLocation);
  });
}
//
function destroy(req, res) {
  db.Location.findOneAndRemove({_id: req.params.locationId }, function(err, foundLocation) {
    if(err) { console.log('locationController.show error', err); }
    console.log('location entry was succesfully deleted!', foundLocation);
    res.json(foundLocation);
  });
}

//PUT /api/locations/:id update existing location
function update(req, res) {
    console.log('updating with data', req.body);
    var updateData = req.body;
    var id = req.params.locationId;
    console.log('test123456');
    db.Location.findByIdAndUpdate(id, updateData, {new: true}, function(err, savedUpdatedLocation) {
        if (err) {
            console.log('locationToUpdate error', err);
        }
        console.log(savedUpdatedLocation);
        res.json(savedUpdatedLocation);
    });
}



// module.exports.index = index;
module.exports = {
  index: index,
  create: create,
  destroy: destroy,
  show: show,
  update: update
//
};


//check req.body  console log to see what I'm getting back
//
