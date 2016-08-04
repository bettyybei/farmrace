window.game = new window.EventEmitter();

(function () {

  var canvas = document.getElementById('game');

  var ctx = canvas.getContext('2d');

  var chickenImg = new Image()
  chickenImg.src = '/img/chicken.png'

  var chickenX = 100;

  document.getElementById('go').addEventListener('click', function() {
    game.moveChicken(true);
  });


  game.setChicken = function (x) {
    chickenX = x;
    ctx.drawImage(chickenImg, chickenX, 100);
  }

  game.moveChicken = function (shouldBroadcast) {
    chickenX += 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(chickenImg, chickenX, 100);

    if (shouldBroadcast) {
      socket.emit('moveChickenEvent', chickenX);
    }
  }

})();