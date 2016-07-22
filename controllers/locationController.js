var db = require('../models');
var locations = [];
locations.push({
              _id: 132,
              streetOne: 'Nine Inch Nails',
              streetTwi: 'The Downward Spiral',
              noteToSelf: '1994, March 8',
              genres: [ 'industrial', 'industrial metal' ]
            });
locations.push({
              _id: 133,
              streetOne: 'Metallica',
              streetTwi: 'Metallica',
              noteToSelf: '1991, August 12',
              genres: [ 'heavy metal' ]
            });
locations.push({
              _id: 134,
              streetOne: 'The Prodigy',
              streetTwi: 'Music for the Jilted Generation',
              noteToSelf: '1994, July 4',
              genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
            });
locations.push({
              _id: 135,
              streetOne: 'Johnny Cash',
              streetTwi: 'Unchained',
              noteToSelf: '1996, November 5',
              genres: [ 'country', 'rock' ]
            });







// GET /api/albums
function index(req, res) {
  // FILL ME IN !
    db.Album.find({}, function(err, albums) {
        res.json(albums);
    });
}


var Locations = {
  index: index,
  create: create,
  destroy: destroy,
  show: show,
  update: update

};
module.exports = Locations;
