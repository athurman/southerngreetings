var mongoose = require('mongoose');
var Postcard = mongoose.model('Postcard');
var State = mongoose.model('State');
var path = require('path');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');

exports.upload = function(req, res){

  console.log(req.files.file);
  console.log(req.body.postcardId);
  var filePath = __dirname + '/../public/uploads/' + req.body.postcardId + '/';
  fs.mkdirSync(filePath);
  var tempPath = req.files.file.path,
    targetPath = path.resolve(filePath + req.files.file.name);
  if (path.extname(req.files.file.name).toLowerCase() === '.png' || '.jpg' || '.gif') {
    fs.rename(tempPath, targetPath, function(err) {
      if (err) throw err;
      console.log('Upload completed!');
      Postcard.findById(req.body.postcardId, function(err, postcard){
        postcard.backImg = req.files.file.name;
        postcard.save(function(err,postcard){
          res.send(postcard);
        });
      });
    });
  } else {
    fs.unlink(tempPath, function () {
        if (err) throw err;
        console.error('Only .png .jpg or .gif files are allowed!');
        res.send({status: 'error'});
      });
  }
};

exports.create = function(req, res){
  State.findOne({name: req.body.state}, function(err, state){
    new Postcard({
                    city: req.body.city,
                    state: state,
                    background: req.body.background,
                    frontFontColor: req.body.frontFontColor,
                    flag: req.body.flag
                  }).save(function(err, postcard){
                    res.send({status: 'ok', id: postcard._id});
                  });
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
  Postcard.findByIdAndUpdate(req.params.id, req.body, function(err,postcard){
    res.send(postcard);
  });
};

exports.print = function(req,res){
  Postcard.findById(req.params.id).populate('state').exec(function(err, postcard){
    console.log(postcard);
    res.render('home/print', {title: 'SouthernGreetings', postcard:postcard});
  });
};

exports.delete = function(req, res){
  Postcard.findByIdAndRemove(req.params.id, function(err, postcard){
    res.redirect('/');
  });
};