var mongoose = require('mongoose');
var Postcard = mongoose.model('Postcard');

exports.create = function(req, res){
  new Postcard(req.body).save(function(err, postcard){
    res.send({status: 'ok', id: postcard._id});
  });
};

exports.show = function(req, res){
  res.render('home/show', {title: 'SouthernGreetings'});
};