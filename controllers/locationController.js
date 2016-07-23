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

// Delete by ID
// function destroy(req, res) {
//     db.Location.findOneAndRemove({_id: req.params.skatespotId}, function(err, skatespotToDelete) {
//         if (err) {
//             console.log(err, "unable to delete");
//         }
//         res.json(skatespotToDelete);
//         console.log("you did it!");
//     });
// }


// module.exports.index = index;
module.exports = {
  index: index,
  create: create,
  destroy: destroy,
  // show: show,
  // update: update
//
};


//check req.body  console log to see what I'm getting back
//
