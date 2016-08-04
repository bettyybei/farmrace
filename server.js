/*var path = require('path');*/
var http = require('http');
var socketio = require('socket.io');/*
var Promise = require('bluebird');*/

var server = http.createServer();
/*
var express = require('express');*/
var app = require('./server/index.js')();

server.on('request', app);

var io = socketio(server);

io.on('connection', function (socket) {
  console.log('A new client has connected with an id of ' + socket.id);


  socket.on('disconnect', function(){
    console.log('Client has disconnected');
  });

  socket.on('moveChickenEvent', function () {
    socket.broadcast.emit('allMoveChickenEvent');
  })

})

server.listen(8080, function () {
  console.log('The server is listening on port 8080!');
});
