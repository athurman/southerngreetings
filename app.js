var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

// route definitions
var home = require('./routes/home');
var postcards = require('./routes/postcards');
var states = require('./routes/states');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/southerngreetings');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);

app.post('/postcards', postcards.create);
app.get('/postcards/:id', postcards.show);

app.get('/make-states', states.make);
app.get('/states', states.find);


// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
