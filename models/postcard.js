var mongoose = require('mongoose');

var Postcard = mongoose.Schema({
  background    :  String,
  frontFontColor:  String,
  frontFontSize :  String,
  backImg       :  String,
  backFontColor :  String,
  backGreeting  :  String,
  backFamilyName:  String,
  flag          :  {},
  city          :  String,
  state         :  {type: mongoose.Schema.Types.ObjectId, ref: 'State'},
  user          :  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt     :  {type: Date, default: Date.now}
});

mongoose.model('Postcard', Postcard);