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



// module.exports.index = index;
module.exports = {
  index: index,
  create: create,
  // destroy: destroy,
  // show: show,
  // update: update
//
};


//check req.body  console log to see what I'm getting back
//
