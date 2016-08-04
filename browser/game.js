window.game = new window.EventEmitter();

(function () {

  var canvas = document.getElementById('game');

  var ctx = canvas.getContext('2d');

  var chickenImg = new Image()
  chickenImg.src = '/img/chicken.png'

  var chicken = {
    x: 100,
    y: 100,
    img: chickenImg,
    move: function () {
      chicken.x += 5;
    },
    draw: function () {
      ctx.drawImage(chicken.img, chicken.x, chicken.y);
    }
  }

  function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    chicken.draw();
  }

  document.getElementById('go').addEventListener('click', function() {
    game.moveChicken(true);
  });

/*  chickenImg.onload = function () {
    ctx.drawImage(chicken.img, chicken.x, chicken.y);
  }*/

  game.moveChicken = function (shouldBroadcast) {
    chicken.move();
    drawEverything();
    if (shouldBroadcast) {
      socket.emit('moveChickenEvent');
    }
  }

})();