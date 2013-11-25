var mongoose = require('mongoose');

var User = mongoose.Schema({
  email     : {type: String, required: [true, 'Email is required'], match: [/\S+@\S+\.\S+/, '{VALUE} is an invalid email.']},
  password  : {type: String, required: [true, 'Password is required'], match: [/[A-Za-z0-9_]{2}(?:[A-Za-z0-9_]{2,})?/, 'Password must be at least 2 characters.']},
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('User', User);