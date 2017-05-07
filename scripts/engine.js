function createEngine(){
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
						game.refreshRate = game.origRefresh;
					}
				}
				//DEV below here should be in separate function!!!DEV
				var newShape;
				if (this.shapesArr.length == 0) {
					this.shapesArr.push(newShape = this.create());
					//check for game over
					var taken = newShape.calculatePositions().some(function(pos){
						return game.screen.xLines[pos[1]][pos[0]].chr != ' '
					});
					if (taken) {
						game.gameOver = function() {
							screenTag.style.borderColor = 'red'
							return true
						}
					}
				}
			}
		},
		checkForFullLines: function() {
			var lines = game.screenAsString().split('\n');
			
			if (lines.some(function(line){return line.indexOf(' ') < 0}) == false){
				return false
			} 


			function pullDown(strArr, i) {
				filler = paddWithChr(' ', strArr[0].length);
				return [filler].concat(strArr.slice(0, i).concat(strArr.slice(i+1)))
			}

			for (var i = lines.length-1; i >= 0; i--) {
				while (lines[i].indexOf(' ') < 0) {
					lines = pullDown(lines, i)
				} 
			}

			game.insertFrameInDom(game.stringAsScreen(lines));			
		},
		map: game.screen, // ?
		update_map: function() {
			this.shapes.shapesArr.forEach(function(shape){
				shape.calculatePositions().forEach(function(pos){
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

	return engine
}
game.gameEngine = createEngine();








