


function startGameLoop(gameOb) {
	return function loop(){
		gameOb.nextFrame();
		if (!gameOb.gameOver()) {setTimeout(loop, gameOb.refreshRate) }
	}
}

var gameLoop = startGameLoop(game)
