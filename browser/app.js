
var socket = io(window.location.origin);

socket.on('connect', function(){
  console.log('I made connection');
});

socket.on('allMoveChickenEvent', function(){
  game.moveChicken();
});
