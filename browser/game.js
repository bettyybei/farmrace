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
      img: chickenImg,
      button: document.getElementById('go-chicken'),
      sound: document.getElementById('chicken-sound')
    },
    cow: {
      x: 0,
      y: 125,
      img: cowImg,
      button: document.getElementById('go-cow'),
      sound: document.getElementById('cow-sound')
    },
    pig: {
      x: 0,
      y: 225,
      img: pigImg,
      button: document.getElementById('go-pig'),
      sound: document.getElementById('pig-sound')
    },
    horse: {
      x: 0,
      y: 325,
      img: horseImg,
      button: document.getElementById('go-horse'),
      sound: document.getElementById('horse-sound')
    }
  }

  animals.chicken.button.addEventListener('click', function () {
    game.moveAnimal('chicken', true);
  });

  animals.cow.button.addEventListener('click', function () {
    game.moveAnimal('cow', true);
  });

  animals.pig.button.addEventListener('click', function () {
    game.moveAnimal('pig', true);
  });

  animals.horse.button.addEventListener('click', function () {
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
    if (animals[type].sound) animals[type].sound.play();
    animals[type].x += 5;

    if (animals[type].x > 650) game.gameOver(type);

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


  var gameOverPopUp = document.getElementById('game-over');
  var winner = document.getElementById('winner')
  var restartButton = document.getElementById('restart-button');


  game.gameOver = function (winningAnimal) {
    for (var type in animals) {
      if (animals.hasOwnProperty(type)) {
        animals[type].button.disabled = true;
      }
    }
    if (gameOverPopUp) {
      gameOverPopUp.style.display = 'block';
      winner.innerHTML = winningAnimal;
    }
  }

  game.restartGame = function () {
    if (gameOverPopUp) gameOverPopUp.style.display = 'none';

    for (var type in animals) {
      if (animals.hasOwnProperty(type)) {
        animals[type].x = 0;
        animals[type].button.disabled = false;
      }
    }

    drawEverything();
  }

  if (restartButton) {
    restartButton.addEventListener('click', function () {
      socket.emit('restartGameEvent');
      game.restartGame();
    });
  }
})();