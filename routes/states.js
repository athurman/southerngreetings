var mongoose = require('mongoose');
var State = mongoose.model('State');

exports.make = function(req, res){

  new State({name:'AL', isLandscape:false, height:428, width:285, img:'al.png'}).save();
  // new State({name:'AK', isLandscape:false, height:0, width:0, img:'ak.png'}).save();
  new State({name:'AR', isLandscape:false, height:387, width:450, img:'ar.png'}).save();
  new State({name:'AZ', isLandscape:false, height:428, width:377, img:'az.png'}).save();
  new State({name:'CA', isLandscape:false, height:428, width:383, img:'ca.png'}).save();
  new State({name:'CO', isLandscape:false, height:325, width:450, img:'co.png'}).save();
  new State({name:'CT', isLandscape:false, height:324, width:450, img:'ct.png'}).save();
  new State({name:'DE', isLandscape:false, height:428, width:172, img:'de.png'}).save();
  new State({name:'FL',isLandscape:false, height:347, width:450, img:'fl.png'}).save();
  new State({name:'GA', isLandscape:false, height:428, width:385, img:'ga.png'}).save();
  // new State({name:'HI', isLandscape:false, height:0, width:0, img:'hi.png'}).save();
  new State({name:'IA', isLandscape:false, height:293, width:450, img:'ia.png'}).save();
  new State({name:'ID', isLandscape:false, height:428, width:277, img:'id.png'}).save();
  new State({name:'IL', isLandscape:false, height:428, width:244, img:'il.png'}).save();
  new State({name:'IN', isLandscape:false, height:428, width:287, img:'in.png'}).save();
  new State({name:'KS', height:233, width:450, img:'ks.png'}).save();
  new State({name:'KY', height:224, width:504, img:'ky.png'}).save();
  new State({name:'LA', isLandscape:false, height:390, width:450, img:'la.png'}).save();
  new State({name:'MA', isLandscape:false, height:252, width:450, img:'ma.png'}).save();
  new State({name:'MD', isLandscape:false, height:231, width:450, img:'md.png'}).save();
  new State({name:'ME', isLandscape:false, height:428, width:289, img:'me.png'}).save();
  new State({name:'MI', isLandscape:false, height:428, width:427, img:'mi.png'}).save();
  new State({name:'MN', isLandscape:false, height:428, width:370, img:'mn.png'}).save();
  new State({name:'MO', isLandscape:false, height:389, width:450, img:'mo.png'}).save();
  new State({name:'MS', isLandscape:false, height:428, width:281, img:'ms.png'}).save();
  new State({name:'MT', height:225, width:390, img:'mt.png'}).save();
  new State({name:'NC', height:225, width:573, img:'nc.png'}).save();
  new State({name:'ND', height:273, width:450, img:'nd.png'}).save();
  new State({name:'NE', height:225, width:480, img:'ne.png'}).save();
  new State({name:'NH', isLandscape:false, height:428, width:223, img:'nh.png'}).save();
  new State({name:'NJ', isLandscape:false, height:428, width:207, img:'nj.png'}).save();
  new State({name:'NM', isLandscape:false, height:428, width:399, img:'nm.png'}).save();
  new State({name:'NV', isLandscape:false, height:428, width:280, img:'nv.png'}).save();
  new State({name:'NY', isLandscape:false, height:403, width:450, img:'ny.png'}).save();
  new State({name:'OH', isLandscape:false, height:428, width:384, img:'oh.png'}).save();
  new State({name:'OK', height:225, width:464, img:'ok.png'}).save();
  new State({name:'OR', isLandscape:false, height:334, width:450, img:'or.png'}).save();
  new State({name:'PA', isLandscape:false, height:260, width:450, img:'pa.png'}).save();
  new State({name:'RI', isLandscape:false, height:428, width:259, img:'ri.png'}).save();
  new State({name:'SC', isLandscape:false, height:350, width:450, img:'sc.png'}).save();
  new State({name:'SD', height:278, width:450, img:'sd.png'}).save();
  new State({name:'TN', height:167, width:650, img:'tn.png'}).save();
  new State({name:'TX', isLandscape:false, height:402, width:450, img:'tx.png'}).save();
  new State({name:'UT', isLandscape:false, height:428, width:343, img:'ut.png'}).save();
  new State({name:'VA', height:225, width:493, img:'va.png'}).save();
  new State({name:'VT', isLandscape:false, height:428, width:267, img:'vt.png'}).save();
  new State({name:'WA', isLandscape:false, height:297, width:450, img:'wa.png'}).save();
  new State({name:'WI', isLandscape:false, height:428, width:376, img:'wi.png'}).save();
  new State({name:'WV', isLandscape:false, height:401, width:450, img:'wv.png'}).save();
  new State({name:'WY', isLandscape:false, height:345, width:450, img:'wy.png'}).save();

  res.redirect('/');
};

exports.find = function(req, res){
  State.findOne({name: req.query.name}, function(err, state){
    res.send(state);
  });
};
