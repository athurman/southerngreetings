var mongoose = require('mongoose');
var User = mongoose.model('User');
var Postcard = mongoose.model('Postcard');

exports.findUser = function(req, res, next){
  if(req.session.userId){
    User.findById(req.session.userId, function(err, user){
      if(user){
        res.locals.user = user;
        next();
      }
    });
  } else {
    next();
  }
};

exports.getPostcards = function(req, res, next){
  if(res.locals.user){
    Postcard.find({user: res.locals.user}, function(err, postcards){
      res.locals.postcards = postcards;
      next();
    });
  } else {
    res.locals.todos = [];
    next();
  }
};