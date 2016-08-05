window.game = new window.EventEmitter();

(function () {

  var canvas = document.getElementById('game');

  var ctx = canvas.getContext('2d');

  var chickenImg = new Image()
  chickenImg.src = '/img/chicken.png'

  var cowImg = new Image()
  cowImg.src = '/img/cow.gif'

  var pigImg = new Image()
  pigImg.src = '/img/pig.gif'

  var horseImg = new Image()
  horseImg.src = '/img/horse.jpg'

  var animals = {
    chicken: {
      x: 0,
      y: 25,
      img: chickenImg
    },
    cow: {
      x: 0,
      y: 125,
      img: cowImg
    },
    pig: {
      x: 0,
      y: 225,
      img: pigImg
    },
    horse: {
      x: 0,
      y: 325,
      img: horseImg
    }
  }

  document.getElementById('go-chicken').addEventListener('click', function() {
    game.moveAnimal('chicken', true);
  });

  document.getElementById('go-cow').addEventListener('click', function() {
    game.moveAnimal('cow', true);
  });

  document.getElementById('go-pig').addEventListener('click', function() {
    game.moveAnimal('pig', true);
  });

  document.getElementById('go-horse').addEventListener('click', function() {
    game.moveAnimal('horse', true);
  });


  game.setAnimals = function (chickenX, cowX, pigX, horseX) {
    animals.chicken.x = chickenX;
    animals.cow.x = cowX;
    animals.pig.x = pigX;
    animals.horse.x = horseX;
    drawEverything();
  }

  game.moveAnimal = function (type, shouldBroadcast) {
    animals[type].x += 5;

    drawEverything();

    if (shouldBroadcast) {
      socket.emit('moveAnimalsEvent', type, animals[type].x);
    }
  }

  function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var type in animals) {
      if (animals.hasOwnProperty(type)) {
        ctx.drawImage(animals[type].img, animals[type].x, animals[type].y);
      }
    }
  }

})();