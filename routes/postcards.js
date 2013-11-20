var mongoose = require('mongoose');
var Postcard = mongoose.model('Postcard');
var path = require('path');
var fs = require('fs');

exports.upload = function(req, res){

  console.log(req.files.file);
  console.log(req.body.postcardId);
  fs.mkdirSync('./public/uploads/'+req.body.postcardId+'/');
  var tempPath = req.files.file.path,
        targetPath = path.resolve('./public/uploads/' + req.body.postcardId + '/' +req.files.file.name);
  if (path.extname(req.files.file.name).toLowerCase() === '.png' || '.jpg' || '.gif') {
      fs.rename(tempPath, targetPath, function(err) {
          if (err) throw err;
          console.log("Upload completed!");
          res.send({status: 'ok'});
      });
  } else {
      fs.unlink(tempPath, function () {
          if (err) throw err;
          console.error("Only .png .jpg or .gif files are allowed!");
          res.send({status: 'error'});
      });
  }
};

exports.create = function(req, res){
  new Postcard(req.body).save(function(err, postcard){
    res.send({status: 'ok', id: postcard._id});
  });
};

exports.show = function(req, res){
  Postcard.findById(req.params.id, function(err, postcard){
    res.render('home/show', {title: 'SouthernGreetings', postcard:postcard});
  });

};

exports.update = function(req, res){
  console.log(req.params);
  console.log(req.body);
  res.send('I made it to the server and back!');
};