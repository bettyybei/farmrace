
var socket = io(window.location.origin);

socket.on('connect', function(){
  console.log('I made connection');

  socket.on('setSavedLocation', function (x) {
    game.setChicken(x)
  })

  socket.on('allMoveChickenEvent', function (){
    game.moveChicken();
  });
});
