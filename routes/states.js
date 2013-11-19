var mongoose = require('mongoose');
var State = mongoose.model('State');

exports.make = function(req, res){

  new State({name:'AK', isLandscape:false, height:0, width:0, img:'ak.png'}).save();
  new State({name:'AL', isLandscape:false, height:428, width:285, img:'al.png'}).save();
  new State({name:'AR', isLandscape:false, height:0, width:0, img:'ar.png'}).save();
  new State({name:'AZ', isLandscape:false, height:0, width:0, img:'az.png'}).save();
  new State({name:'CA', isLandscape:false, height:0, width:0, img:'ca.png'}).save();
  new State({name:'CO', isLandscape:false, height:0, width:0, img:'co.png'}).save();
  new State({name:'CT', isLandscape:false, height:0, width:0, img:'ct.png'}).save();
  new State({name:'DE', isLandscape:false, height:0, width:0, img:'de.png'}).save();
  new State({name:'FL',isLandscape:false, height:347, width:450, img:'fl.png'}).save();
  new State({name:'GA', isLandscape:false, height:428, width:385, img:'ga.png'}).save();
  new State({name:'HI', isLandscape:false, height:0, width:0, img:'hi.png'}).save();
  new State({name:'IA', isLandscape:false, height:0, width:0, img:'ia.png'}).save();
  new State({name:'ID', isLandscape:false, height:0, width:0, img:'id.png'}).save();
  new State({name:'IL', isLandscape:false, height:0, width:0, img:'il.png'}).save();
  new State({name:'IN', isLandscape:false, height:0, width:0, img:'in.png'}).save();
  new State({name:'KS', isLandscape:false, height:0, width:0, img:'ks.png'}).save();
  new State({name:'KY', height:224, width:504, img:'ky.png'}).save();
  new State({name:'LA', isLandscape:false, height:390, width:450, img:'la.png'}).save();
  new State({name:'MA', isLandscape:false, height:0, width:0, img:'ma.png'}).save();
  new State({name:'MD', isLandscape:false, height:0, width:0, img:'md.png'}).save();
  new State({name:'ME', isLandscape:false, height:0, width:0, img:'me.png'}).save();
  new State({name:'MI', isLandscape:false, height:0, width:0, img:'mi.png'}).save();
  new State({name:'MN', isLandscape:false, height:0, width:0, img:'mn.png'}).save();
  new State({name:'MO', isLandscape:false, height:0, width:0, img:'mo.png'}).save();
  new State({name:'MS', isLandscape:false, height:428, width:281, img:'ms.png'}).save();
  new State({name:'MT', isLandscape:false, height:0, width:0, img:'mt.png'}).save();
  new State({name:'NC', height:225, width:573, img:'nc.png'}).save();
  new State({name:'ND', isLandscape:false, height:0, width:0, img:'nd.png'}).save();
  new State({name:'NE', isLandscape:false, height:0, width:0, img:'ne.png'}).save();
  new State({name:'NH', isLandscape:false, height:0, width:0, img:'nh.png'}).save();
  new State({name:'NJ', isLandscape:false, height:0, width:0, img:'nj.png'}).save();
  new State({name:'SC', isLandscape:false, height:350, width:450, img:'sc.png'}).save();
  new State({name:'TN', height:167, width:650, img:'tn.png'}).save();
  new State({name:'VA', height:225, width:493, img:'va.png'}).save();
  new State({name:'WV', isLandscape:false, height:401, width:450, img:'ms.png'}).save();



  res.redirect('/');
};

// AK   ALASKA --
// AL   ALABAMA --
// AR   ARKANSAS --
// AZ   ARIZONA --
// CA   CALIFORNIA --
// CO   COLORADO --
// CT   CONNECTICUT --
// DC   WASHINGTON, DC
// DE   DELAWARE --
// FL   FLORIDA --
// GA   GEORGIA --
// HI   HAWAII --
// IA   IOWA --
// ID   IDAHO --
// IL   ILLINOIS --
// IN   INDIANA --
// KS   KANSAS --
// KY   KENTUCKY --
// LA   LOUISIANA --
// MA   MASSACHUSETTS --
// MD   MARYLAND --
// ME   MAINE --
// MI   MICHIGAN --
// MN   MINNESOTA --
// MO   MISSOURI --
// MS   MISSISSIPPI --
// MT   MONTANA --
// NC   NORTH CAROLINA --
// ND   NORTH DAKOTA --
// NE   NEBRASKA --
// NH   NEW HAMPSHIRE --
// NJ   NEW JERSEY --
// NM   NEW MEXICO
// NV   NEVADA
// NY   NEW YORK
// OH   OHIO
// OK   OKLAHOMA
// OR   OREGON
// PA   PENNSYLVANIA
// PR   PUERTO RICO
// PW   PALAU
// RI   RHODE ISLAND
// SC   SOUTH CAROLINA
// SD   SOUTH DAKOTA
// TN   TENNESSEE
// TX   TEXAS
// UT   UTAH
// VA   VIRGINIA
// VI   VIRGIN ISLANDS
// VT   VERMONT
// WA   WASHINGTON
// WI   WISCONSIN
// WV   WEST VIRGINIA
// WY   WYOMING


exports.find = function(req, res){
  State.findOne({name: req.query.name}, function(err, state){
    res.send(state);
  });
};
