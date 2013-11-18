var mongoose = require('mongoose');

var User = mongoose.Schema({
  email     : {type: String, required: true},
  password  : String,
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('User', User);