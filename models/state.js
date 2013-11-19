var mongoose = require('mongoose');

var State = mongoose.Schema({
  name     : String,
  isLandscape: {type: Boolean, default: true},
  height   : Number,
  width    : Number,
  img      : String
});

mongoose.model('State', State);