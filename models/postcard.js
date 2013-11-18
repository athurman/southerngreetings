var mongoose = require('mongoose');

var Postcard = mongoose.Schema({
  background    :  String,
  frontFontColor:  String,
  backImg       :  String,
  city          :  String,
  state         :  String,
  user          :  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt     :  {type: Date, default: Date.now}
});

mongoose.model('Postcard', Postcard);