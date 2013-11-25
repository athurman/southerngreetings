var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

/*
 * POST /users
 */

exports.create = function(req, res){

  var user = new User();
  user.email = req.body.email;
  bcrypt.hash(req.body.password, 10, function(err, hash){
    user.password = hash;
    user.save(function(err,user){
      if(err){
        console.log(err);
        res.send({error: err});
      }
      else{
        res.send({status: 'ok'});
      }
    });
  });
};

exports.login = function(req, res) {
  User.findOne({email: req.body.email}, function(err, user){
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(result) {
          req.session.regenerate(function(err){
            req.session.userId = user.id;
            req.session.save(function(err){
              res.send({status: 'ok', email: user.email});
            });
          });
        }
        else{
          req.session.destroy(function(err){
            res.send({status: 'error'});
          });
        }
      });
    } else {
      res.send({status: 'user not fund.'});
    }
  });
};

/*
 * DELETE /logout
 */

exports.logout = function(req, res){
  req.session.destroy(function(err){
    res.send({status: 'ok'});
  });
};
