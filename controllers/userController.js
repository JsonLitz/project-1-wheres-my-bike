var db = require('../models');

// Why is this located here? I don't think that you ever connected this controller action to a route
// (and it should be part of locationController if used), so it would be best to delete it
function create(req, res) {
    var newLocation = new db.Location({
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
