/* global document, sendAjaxRequest, window, io */

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  // checkFileReaderFunctionality();
  // $('#file').on('change', handleFileSelect);
  $('#backgrounds-container div').on('click', clickSelectBGPattern);
  $('#preview-front').on('click', clickPreviewFront);
  $('#submit-front').on('click', clickFrontPostcardSubmit);
  $('#preview-back').on('click', clickPreviewBack);
  $('#submit-back').on('click', clickBackPostcardSubmit);
  $('a#submit-image').on('click', submitUploadImage);
}

// ------------------------------------------------------------------//
// ------------------------------------------------------------------//
// ------------------------CLICK FUNCTION----------------------------//

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
    switch(data.status){
      case 'ok':
        window.location = '/';
      break;
      case 'error':
        $('p#upload-error').text('There was an error uploading your file');
      break;
    }
  });
}

// function handleFileSelect(evt) {
//   $('#list span').remove();
//   var file = evt.target.files[0]; // FileList object

//   // Loop through the FileList and render image files as thumbnails.

//   // Only process image files.
//   // if (!file.type.match('image.*')) {
//   //   continue;
//   // } else {
//   //   alert('Please select an image filetype.');
//   // }

//   var reader = new FileReader();

//   // Closure to capture the file information.
//   reader.onload = (function(theFile) {
//     return function(e) {
//       // Render thumbnail.
//       var span = document.createElement('span');
//       span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                         '" title="', escape(theFile.name), '"/>'].join('');
//       document.getElementById('list').insertBefore(span, null);
//     };
//   })(file);

//   // Read in the image file as a data URL.
//   reader.readAsDataURL(file);
//   evt.target.files.length = 0;
// }


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
  $('#submit-front').removeClass('hidden');
}

function clickFrontPostcardSubmit(e) {
  var city = $('#city').val();
  var state = $('#states :selected').text();
  var color = $('#color').val();
  var background = $('#backgrounds-container .selected').attr('id');
  var url = '/postcards';
  var data = {city:city, state:state, background:background, frontFontColor:color};
  //Save front portion of postcard to database, will update back portion on step 2 page.
  sendAjaxRequest(url, data, 'post', null, e, function(data){
    console.log(data);
    htmlStepTwo(data);
  });
}

function clickPreviewBack() {
  $('#back-img-message h4').remove();
  $('#back-img-container img').remove();

  var backGreeting = $('#seasons-greeting :selected').text();
  var backFamilyName = $('#family-name').val();
  var color = $('#color-back').val();
  var backImg = $('#list span img').attr('src');

  var $h4 = $('<h4>').text(backGreeting + ' from ' + backFamilyName);
  $h4.css('color', color);
  $('#back-img-message').append($h4);

  var $img = $('<img>');
  $img.attr('src', backImg);
  $('#back-img-container').append($img);

  $('#back-card').removeClass('hidden');
  $('#submit-back').removeClass('hidden');
}

function clickBackPostcardSubmit(e) {
  var url = '/postcards/update';
  var backGreeting = $('#seasons-greeting :selected').text();
  var backFamilyName = $('#family-name').val();
  var color = $('#color-back').val();
  var backImg = $('#list span img').attr('src');

  var data = {backGreeting:backGreeting, backFamilyName:backFamilyName, backFontColor:color, backImg:backImg};

  sendAjaxRequest(url, data, 'post', 'put', e, function(data){
    console.log(data);
  });
}

// ------------------------------------------------------------------//
// ------------------------------------------------------------------//
// ----------------------HTML FUNCTION-------------------------------//

function htmlAddState(state, $h2, color) {
  var $div = $('<div>').attr('id','pc-state');
  $div.css('background', 'url(/images/states/' + state.img + ') no-repeat').css('width', state.width).css('height', state.height).css('margin', '0 auto');
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
    $('#front-card').css('background', 'url(/images/backgrounds/biege-burlap.jpg)');
  }
  if(background === 'pattern2') {
    $('#front-card').css('background', 'url(/images/backgrounds/dark-burlap.jpg)');
  }
  if(background === 'pattern3') {
    $('#front-card').css('background', 'url(/images/backgrounds/plaid-green.jpg)');
  }
}

function htmlStepTwo(result) {
  if(result.status === 'ok') {
    window.location.href = '/postcards/' + result.id;
  }
}

// ------------------------------------------------------------------//
// ------------------------------------------------------------------//
// ------------------------------------------------------------------//

// function checkFileReaderFunctionality() {
//     // Check for the various File API support.
//   if (window.File && window.FileReader && window.FileList && window.Blob) {
//     // Great success! All the File APIs are supported.
//   } else {
//     console.log('The File APIs are not fully supported in this browser.');
//   }
// }

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
