function newGame() {
	var game = {
		origRefresh: 400,
		refreshRate: 400, 

		screen: null,
		gameEngine: null,

		screenAsString: function() {
			return this.screen.xLines.map(function(line){
				return line.map(function(ob){return ob.chr}).join('')
			}).join('\n')
		},

		stringAsScreen: function(strArr) {
			strArr.forEach(function(line, i){
				line.split('').forEach(function(chr, j){game.screen.xLines[i][j].chr = chr})
			})
		},

		nextFrame: function(){
			this.gameEngine.advance();
			this.insertFrameInDom(this.screenAsString())
		},

		colorize: function(str) {
			if (this.gameEngine.shapes.shapesArr.length == 0) return false
			var screen = this.screen.xLines; 
			
			this.gameEngine.shapes.shapesArr.forEach(function(shape){
				shape.calculatePositions().forEach(function(loc){
					game.screen.xLines[loc[1]][loc[0]].color = shape.coloring;
				});
			}); 
			
			return this.screen.xLines.map(function(line){
				return line.map(function(pixel){
					if (pixel.color) {
						var str = "<span style='color:" + pixel.color + "'>#</span>";
						pixel.color = false;
						return str
					} else {
						return pixel.chr
					}
				}).join('');
			}).join('<br>');
		},

		insertFrameInDom: function(str){
			var needsColor = this.colorize(str);
			screenTag.innerHTML = needsColor ? this.colorize(str) : str;
		},

		gameOver: function() {return false}
	};
	return game
}

var game = newGame();