var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project-1-wheres-my-bike");

module.exports.Location = require("./location.js");
module.exports.User = require("./user.js");
