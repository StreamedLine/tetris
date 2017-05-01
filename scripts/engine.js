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
				if (this.shapesArr.length == 0) {
					game.gameEngine.shapes.shapesArr.push(game.gameEngine.shapes.create());
					//check for game over!
				}
			}
		},
		map: game.screen,
		update_map: function() {
			this.shapes.shapesArr.forEach(function(shape){
				shape.calculatePostions().forEach(function(pos){
					console.log(pos)
					game.screen.xLines[pos[1]][pos[0]].chr = '#'
				});
			});
		},
		advance: function() {
			this.shapes.gravity();
			this.shapes.prune();
			this.update_map();
		}
	};

	game.gameEngine = engine
}());


(function createShapes(){
	function Shape(name) {
		var sd = 0, //distance from top
			sx = 6; //should be random without going beyond edge
		this.shapeMap = engine.shapes.shapes['line']; //DEV should be 'name' instaed of 'line'
		this.orientation = 0;
		this.done = false;
		this.sd = function(){return sd };
		this.sx = function(){return sx };
		this.calculatePostions = function() {
			var guide = this.shapeMap[this.orientation];
			return guide.map(function(pos){
				return [sx + pos[0], sd + pos[1]];
			});
		}
		this.gravity = function() {
			var positions = this.calculatePostions(),
			    guide = this.shapeMap[this.orientation];
			guide = guide.filter(function(spot){return spot[2] === true });
			if (guide.every(function(spot){console.log(spot[1]+1+sd);return spot[1]+1+sd < game.screen.h && game.screen.xLines[spot[1]+1+sd][spot[0]+sx].chr === ' '})) {
				positions.forEach(function(pos){game.screen.xLines[pos[1]][pos[0]].chr = ' ' });
				sd += 1;
			} else {
				this.done = true;
			}
		}
	}

	var engine = game.gameEngine;

	engine.shapes.shapeNames = ['line', 'plus'];
	
	engine.shapes.shapes = {
		line: [ [[0,0,false],[0,1,false],[0,2,true]] , [[-1,0,true],[0,0,true],[1,0,true]] ],
		plus: 'dev'
	};

	engine.shapes.create = function createShape() {
		return new Shape( engine.shapes.shapeNames.randFromArr() );
	};

}());








