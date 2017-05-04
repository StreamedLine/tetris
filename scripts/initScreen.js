(function initScreen(){
	var screen_w = 16,
		screen_h = 10;
	var screen = {
		pixels: [],
		xLines: [],
		yLines: [],
		w: screen_w,
		h: screen_h
	};


	for (var z = 0; z < screen_h * screen_w; z++) {
		screen.pixels.push(function(){return {x: null, y: null, chr: ' '}}())
	}

	var counter = 0;
	for (var i = 0; i < screen_h; i++) {
		screen.xLines.push([]);
		for (var j = 0; j < screen_w; j++) {
			screen.xLines[i].push(screen.pixels[counter]);
			counter++;
		}
	}

	game.screen = screen;
}());