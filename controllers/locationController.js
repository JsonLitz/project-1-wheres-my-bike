var db = require('../models');
var locations = [];






// GET /api/albums
function index(req, res) {
  // FILL ME IN !
    db.Album.find({}, function(err, albums) {
        res.json(albums);
    });
}
