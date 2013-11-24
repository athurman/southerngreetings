/* global document, sendAjaxRequest, sendAjaxFiles, FormData, Draggabilly, html2canvas, window, io */

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#backgrounds-container div').on('click', clickSelectBGPattern);
  $('#preview-front').on('click', clickPreviewFront);
  $('#submit-front').on('click', clickFrontPostcardSubmit);
  $('#preview-back').on('click', clickPreviewBack);
  $('#submit-back').on('click', clickBackPostcardSubmit);
  $('a#submit-image').on('click', submitUploadImage);
  $('#choose-flag div').on('click', clickCreateFlag);
  // $('#print').on('click', clickPrintCardtoImage);
  $('#print').on('click', clickPrintCard);
}

// ------------------------------------------------------------------//
// ------------------------------------------------------------------//
// ------------------------CLICK FUNCTION----------------------------//

function draggabillyInitialize(){
  var elem = document.querySelector('.draggie');
  var draggie = new Draggabilly( elem, {
    containment: true
  });
}

function submitUploadImage(e) {
  var url = '/upload';
  var postcardId = $(this).data('postcard-id');
  var fileData = new FormData();
  var file, fileName;
  $('#upload-image input[type="file"]').each(function(i){
    if(this.files[0]){
      file = this.files[0];
      fileName = $(this).attr('name');
      fileData.append(fileName,file);
    }
  });
  fileData.append('postcardId',postcardId);
  sendAjaxFiles(url, fileData, 'post', null, e, function(data){
    console.log(data);
    if(data.status === 'error'){
      $('p#upload-error').css('color', 'red').text('There was an error uploading your file');
    } else {
      console.log('made it back!');
      htmlAddUserImage(data);
    }
  });
}

function clickSelectBGPattern() {
  $('#backgrounds-container div').removeClass('selected');
  $('#backgrounds-container div').addClass('border');

  var $this = $(this);
  $this.removeClass('border');
  $this.addClass('selected');
}

function clickPreviewFront() {
  $('#front-card #pc-state').remove();
  $('#front-card h2:nth-of-type(2)').remove();

  var city = $('#city').val();
  var state = $('#states :selected').text();
  var background = $('#backgrounds-container .selected').attr('id');
  var color = $('#color').val();
  var $h2 = $('<h2>').text(city + ', ' + state);
  $('#front-card').addClass('postard');
  sendAjaxRequest('/states', {name: state}, 'get', null, null, function(data){
    console.log(data);
    htmlAddState(data, $h2, color);
  });
  htmlAddBackground(background);
  $('#front-card').removeClass('hidden');
  $('#choose-flag').removeClass('hidden');
  $('#submit-front').removeClass('hidden');
  window.location.href = '/#front-card';
}

function clickFrontPostcardSubmit(e) {
  var flag = {};
  flag.top = $('.draggie').css('top');
  flag.left = $('.draggie').css('left');
  if($('.draggie').hasClass('flag1')){
    flag.img = 'flag1';
  }
  if($('.draggie').hasClass('flag2')){
    flag.img = 'flag2';
  }
  if($('.draggie').hasClass('flag3')){
    flag.img = 'flag3';
  }

  var city = $('#city').val();
  var state = $('#states :selected').text();
  var color = $('#color').val();
  var background = $('#backgrounds-container .selected').attr('id');
  var url = '/postcards';
  var data = {city:city, state:state, background:background, frontFontColor:color, flag:flag};
  //Save front portion of postcard to database, will update back portion on step 2 page.
  sendAjaxRequest(url, data, 'post', null, e, function(data){
    htmlStepTwo(data);
  });
}

function clickPreviewBack() {
  $('#back-img-message h4').remove();

  var backGreeting = $('#seasons-greeting :selected').text();
  var backFamilyName = $('#family-name').val();
  var color = $('#color-back').val();

  var $h4 = $('<h4>').text(backGreeting + ' from ' + backFamilyName);
  $h4.css('color', color);
  $('#back-img-message').append($h4);

  $('#back-card').removeClass('hidden');
  $('#submit-back').removeClass('hidden');
  // window.location.href = '/' + $('#container').data('postcard-id') + '/#back-card';
}

function clickBackPostcardSubmit(e) {
  var url = '/postcards/' + $('#container').data('postcard-id') + '/update';
  var backGreeting = $('#seasons-greeting :selected').text();
  var backFamilyName = $('#family-name').val();
  var color = $('#color-back').val();

  var data = {backGreeting:backGreeting, backFamilyName:backFamilyName, backFontColor:color};

  sendAjaxRequest(url, data, 'post', 'put', e, function(data){
    htmlStepThree(data);
  });
}

// Using draggabilly to create icon for state

function clickCreateFlag() {
  var id = $(this).attr('id');
  if(id === 'flag1'){
    $('.draggie').css('background', 'url(/images/flags/flag1.png) no-repeat').css('background-size', '100%').addClass('flag1').removeClass('flag2').removeClass('flag3');
  }
  if(id === 'flag2'){
    $('.draggie').css('background', 'url(/images/flags/flag2.png) no-repeat').css('background-size', '100%').addClass('flag2').removeClass('flag1').removeClass('flag3');
  }
  if(id === 'flag3'){
    $('.draggie').css('background', 'url(/images/flags/flag3.png) no-repeat').css('background-size', '100%').addClass('flag3').removeClass('flag2').removeClass('flag1');
  }
  draggabillyInitialize();
}

function clickPrintCard(e) {
  var url = '/postcard/' + $('#container').data('postcard-id') + '/print';

  sendAjaxRequest(url, data, 'get', null, e, function(data){
    console.log(data);
  });

}

// function clickPrintCardtoImage() {
//   html2canvas($('#front-card'), {
//     onrendered: function(canvas) {
//       $('#snapshot-container').append(canvas);
//     }
//   });
// }

// ------------------------------------------------------------------//
// ------------------------------------------------------------------//
// ----------------------HTML FUNCTION-------------------------------//

function htmlAddState(state, $h2, color) {
  var $div = $('<div>').attr('id','pc-state');
  $div.css('background', 'url(/images/states/' + state.img + ') no-repeat').css('width', state.width).css('height', state.height).css('margin', '0 auto');
  var $draggie = $('<div>').addClass('draggie');
  $div.append($draggie);
  if(state.isLandscape) {
    $('#front-card').css('height', '500').css('width', '700');
    $('#front-card').append($div);
  } else {
    $('#front-card').css('height', '700').css('width', '500');
    $('#front-card').append($div);
  }
  $('#front-card').append($h2);
  $('#front-card h2').css('color', color);
  var h2Height = parseInt($('#front-card h2:nth-of-type(2)').css('height').slice(0, -2));
  if(h2Height > 112) {
    $('#front-card h2').css('font-size', '60px');
  } else {
    $('#front-card h2').css('font-size', '80px');
  }
}

function htmlAddBackground(background) {
  if(background === 'pattern1') {
    $('#front-card').css('background', 'url(/images/backgrounds/pattern1.jpg)');
  }
  if(background === 'pattern2') {
    $('#front-card').css('background', 'url(/images/backgrounds/pattern2.jpg)');
  }
  if(background === 'pattern3') {
    $('#front-card').css('background', 'url(/images/backgrounds/pattern3.jpg)');
  }
}

function htmlAddUserImage(postcard) {
  $('#upload-image').addClass('hidden');
  var $imgThumb = $('<img>');
  var $img = $('<img>');

  $img.attr('src', '../uploads/' + postcard._id + '/' + postcard.backImg);
  $imgThumb.attr('src', '../uploads/' + postcard._id + '/' + postcard.backImg);

  $('#list').append($imgThumb);
  $('#back-img-container').append($img);
}

function htmlStepTwo(result) {
  if(result.status === 'ok') {
    window.location.href = '/postcards/' + result.id;
  }
}

function htmlStepThree(postcard) {
  if(postcard._id) {
    window.location.href = '/postcards/' + postcard._id + '/complete';
  }
}



// ------------------------------------------------------------------//
// ------------------------------------------------------------------//
// ------------------------------------------------------------------//

var socket;

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}
