var goBtn = document.getElementsByClassName('button')[0],
	screenTag = document.getElementById('screen');


document.body.addEventListener('keyup', function(e){
	console.log(e.keyCode)
	if (game && game.gameEngine)
		game.gameEngine.shapes.shapesArr.forEach(function(s){s.keyboardPress(e.keyCode)})
});