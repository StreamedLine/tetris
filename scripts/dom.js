var goBtn = document.getElementsByClassName('button')[0],
	screenTag = document.getElementById('screen');


goBtn.onclick = function() {
	if (game) game = newGame();
	initScreen();
	game.gameEngine = createEngine();
	createShapes();
	gameLoop = startGameLoop(game)
	screenTag.style.borderColor = 'grey'
	gameLoop();
}

document.body.addEventListener('keydown', function(e){
	if (game && game.gameEngine)
		game.gameEngine.shapes.shapesArr.forEach(function(s){s.keyboardPress(e.keyCode)});
});


document.body.addEventListener('keyup', function(e){
	if (e.keyCode == 40)	
		game.refreshRate = game.origRefresh;
});