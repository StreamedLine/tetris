(function createEngine(){
	var engine = {
		shapes: {
			shapesArr:[], //{gravity: function(){}, locations: []}
			gravity: function() {
				this.shapesArr.forEach(function(shape){
					shape.gravity();
				});
			},
			prune: function() {
				for (var i = this.shapesArr.length-1; i >= 0 ; i--) {
					if (this.shapesArr[i].done){
						this.shapesArr.pop();
					}
				}
				//DEV below here should be in separate function!!!DEV
				var newShape;
				if (this.shapesArr.length == 0) {
					this.shapesArr.push(newShape = this.create());
					//check for game over
					var taken = newShape.calculatePostions().some(function(pos){
						console.log(newShape)
						return game.screen.xLines[pos[1]][pos[0]].chr != ' '
					});
					if (taken) {
						game.gameOver = function() {return true}
					}
				}
			}
		},
		checkForFullLines: function() {
			var lines = game.screenAsString().split('\n');
			if (lines.some(function(line){return line.indexOf(' ') < 0}) == false){
				console.log('returned')
				return false
			} else {
				console.log('NOT RETURNED')
			}
			for (var i = lines.length-1; i >= 0; i--) {
				if (lines[i].indexOf(' ') < 0) {
					game.screen.xLines[i].forEach(function(s){s.chr = ' ' });
					game.insertFrameInDom(game.screenAsString());
				} 
			}
			lines = game.screenAsString().split('\n');
			//bad code
			for (var i = lines.length-1; i > 0; i--) {
				for (var j = 0; j < lines[i].length; j++) {
					if (lines[i][j] === ' ' && lines[i-1][j] === '#') { 
						lines[i-1] = lines[i-1].slice(0, j) + ' ' + lines[i-1].slice(j+1);
						lines[i]   = lines[i].slice(0, j)   + '#' + lines[i-1].slice(j+1);
					}
				}
			}
			game.insertFrameInDom(lines.join('\n'))			
		},
		map: game.screen, // ?
		update_map: function() {
			this.shapes.shapesArr.forEach(function(shape){
				shape.calculatePostions().forEach(function(pos){
					game.screen.xLines[pos[1]][pos[0]].chr = '#'
				});
			});
		},
		advance: function() {
			this.shapes.gravity();
			this.shapes.prune();
			this.checkForFullLines();
			this.update_map();
		}
	};

	game.gameEngine = engine
}());









