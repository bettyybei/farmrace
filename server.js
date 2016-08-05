var http = require('http');
var socketio = require('socket.io')

var server = http.createServer();

var app = require('./server/index.js')();

server.on('request', app);

var io = socketio(server);

var animalsX = {
  chicken: 0,
  cow: 0,
  pig: 0,
  horse: 0
}

io.on('connection', function (socket) {
  console.log('A new client has connected with an id of ' + socket.id);
  socket.emit('setSavedLocations', animalsX);

  socket.on('disconnect', function(){
    console.log('Client has disconnected');
  });

  socket.on('moveAnimalsEvent', function (type, x) {
    animalsX[type] = x;
    socket.broadcast.emit('allMoveAnimalsEvent', type);
  });

  socket.on('restartGameEvent', function () {
    for (var type in animalsX) {
      if (animalsX.hasOwnProperty(type)) {
        animalsX[type] = 0;
      }
    }
    socket.broadcast.emit('restartGame');
  })

})

server.listen(8080, function () {
  console.log('The server is listening on port 8080!');
});
