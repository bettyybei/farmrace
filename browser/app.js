
var socket = io(window.location.origin);

socket.on('connect', function(){
  /*console.log('I made connection');*/

  socket.on('setSavedLocations', function (animalsX) {
    game.setAnimals(animalsX.chicken, animalsX.cow, animalsX.pig, animalsX.horse);
  })

  socket.on('allMoveAnimalsEvent', function (type){
    game.moveAnimal(type);
  });

  socket.on('restartGame', function (){
    game.restartGame();
  });

});
