/* global document, window, io */

$(document).ready(initialize);

$('#backgrounds-container div').on('click', clickSelectBGPattern);
$('#preview-front').on('click', clickPreviewFront);
$('#submit-front').on('click', clickFrontPostcard);

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
  var $h2 = $('<h2>').text(city + ', ' + state);

  $('#front-card').addClass('postard');
  htmlAddState(state);
  $('#front-card').append($h2);
  htmlAddBackground(background);


  $('#front-card').removeClass('hidden');
  $('#submit-front').removeClass('hidden');
}

function clickFrontPostcard(e) {
  var city = $('#city').val();
  var state = $('#states :selected').text();
  var background = $('#backgrounds-container .selected').attr('id');
  var url = '/postcards';
  var data = {city:city, state:state, background:background};

  sendAjaxRequest(url, data, 'post', null, e, function(data){
    console.log(data);
    htmlStepTwo(data);
  });
}

// ------------------------------------------------------------------//
// ------------------------------------------------------------------//
// ----------------------HTML FUNCTION-------------------------------//

function htmlAddState(state) {
  if(state === 'TN') {
    var $divtn = $('<div>').attr('id', 'pc-state');
    $divtn.css('background', 'url(/images/states/tennessee.png) no-repeat').css('width', '650').css('height', '167');
    $('#front-card').append($divtn);
  }
  if(state === 'KY') {
    var $divky = $('<div>').attr('id', 'pc-state');
    $divky.css('background', 'url(/images/states/kentucky.png) no-repeat').css('width', '464').css('height', '200').css('margin', '0 auto');
    $('#front-card').append($divky);
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
