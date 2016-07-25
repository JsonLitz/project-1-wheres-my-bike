var db = require('../models');







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
