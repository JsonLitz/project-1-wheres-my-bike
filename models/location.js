var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: "User"}, // Each location will reference a specific user.
  streetOne: String,
  streetTwo: String,
  noteToSelf: String,
  dateTime: {type:Date, default: new Date()}
});

var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
