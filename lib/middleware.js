var mongoose = require('mongoose');
var User = mongoose.model('User');
var Postcard = mongoose.model('Postcard');

exports.findUser = function(req, res, next){
  if(req.session.userId){
    User.findById(req.session.userId, function(err, user){
      if(user){
        res.locals.user = user; // http://expressjs.com/api.html#res.locals: Response local variables are scoped to the request, thus only available to the view(s) rendered during that request / response cycle, if any.
        next();
      }
    });
  } else {
    next();
  }
};

exports.getPostcards = function(req, res, next){
  if(res.locals.user){
    Postcard.find({user: res.locals.user}).populate('state').exec(function(err, postcards){
      res.locals.postcards = postcards;
      next();
    });
  } else {
    res.locals.postcards = [];
    next();
  }
};