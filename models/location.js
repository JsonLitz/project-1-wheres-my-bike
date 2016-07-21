var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  streetOne: String,
  streetTwo: String,
  noteToSelf: String,
  dateTime: Number
});

var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
