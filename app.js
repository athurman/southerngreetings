var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

// route definitions
var home = require('./routes/home');
var users = require('./routes/users');
var postcards = require('./routes/postcards');
var states = require('./routes/states');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/southerngreetings');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);

app.post('/users', users.create);
app.put('/login', users.login);
app.delete('/logout', users.logout);

app.post('/upload', postcards.upload);

app.get('/create', postcards.initialize);
app.post('/postcards', postcards.create);
app.get('/postcards/:id', postcards.show);
app.put('/postcards/:id/update', postcards.update);
app.get('/postcards/:id/complete', postcards.print);
app.delete('/postcards/:id', postcards.delete);
app.get('/postcards/:id/print', postcards.createPDF);
app.get('/postcards/:id/pdf', postcards.printPDF);

app.get('/make-states', states.make);
app.get('/states', states.find);


// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
