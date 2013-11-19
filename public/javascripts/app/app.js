/* global document, sendAjaxRequest, window, io */

$(document).ready(initialize);

$('#backgrounds-container div').on('click', clickSelectBGPattern);
$('#preview-front').on('click', clickPreviewFront);
$('#submit-front').on('click', clickFrontPostcardSubmit);

// ------------------------------------------------------------------//
// ------------------------------------------------------------------//
// ------------------------CLICK FUNCTION----------------------------//

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

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}
