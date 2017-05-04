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


(function createShapes(){
	function Shape(name) {
		var sd = 0, //distance from top
			sx = 10; //should be random without going beyond edge
		this.shapeMap = engine.shapes.shapes[name]; //DEV should be 'name' instaed of 'line'
		this.orientation = 0;
		this.focused = true;
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
			if (guide.every(function(spot){return spot[1]+1+sd < game.screen.h && game.screen.xLines[spot[1]+1+sd][spot[0]+sx].chr === ' '})) {
				positions.forEach(function(pos){game.screen.xLines[pos[1]][pos[0]].chr = ' ' });
				sd += 1;
			} else {
				this.done = true;
			}
		};
		this.reorient = function(val) {
			var original = this.orientation;

			this.calculatePostions().forEach(function(pos){
				game.screen.xLines[pos[1]][pos[0]].chr = ' '
			});

			var ortn = this.orientation += val;
			if (ortn < 0) {this.orientation = this.shapeMap.length-1}
			if (ortn >= this.shapeMap.length) {this.orientation = 0}
			var taken = this.calculatePostions().some(function(pos){
				return pos[0] <= 0 || pos[0] >= game.screen.xLines[0].length ||
					   pos[1] <= 0 || pos[1] >= game.screen.xLines.length ||
					   game.screen.xLines[pos[1]][pos[0]].chr != ' '
			});
			if (taken) {
				this.orientation = original;
				this.calculatePostions().forEach(function(pos){
					game.screen.xLines[pos[1]][pos[0]].chr = '#'
				});
				return false;
			} else {
				game.gameEngine.update_map();
				game.insertFrameInDom(game.screenAsString());
				return true;
			}
		};
		this.moveLeft = function(val) {
			var positions = this.calculatePostions(),
				guide = this.shapeMap[this.orientation];
			guide = guide.filter(function(spot){return spot[3].left === true });
			if (guide.every(function(spot){return spot[0]-1+sx >= 0 && game.screen.xLines[spot[1]+sd][spot[0]-1+sx].chr === ' '})) {
				positions.forEach(function(pos){game.screen.xLines[pos[1]][pos[0]].chr = ' ' });
				sx -= 1;
				game.gameEngine.update_map();
				game.insertFrameInDom(game.screenAsString());
			}

		};
		this.moveRight = function(val) {
			var positions = this.calculatePostions(),
				guide = this.shapeMap[this.orientation];
			guide = guide.filter(function(spot){return spot[3].right === true });
			if (guide.every(function(spot){return spot[0]+1+sx < game.screen.xLines[0].length && game.screen.xLines[spot[1]+sd][spot[0]+1+sx].chr === ' '})) {
				positions.forEach(function(pos){game.screen.xLines[pos[1]][pos[0]].chr = ' ' });
				sx += 1;
				game.gameEngine.update_map();
				game.insertFrameInDom(game.screenAsString());
			}

		};
		this.keyboardPress = function(val) {
			if (game.gameEngine.shapes.shapesArr.length == 0)
				return
			if (val == 37) {
				this.moveLeft(-1);
			} 
			if (val == 39) {
				this.moveRight(1)
			}
			if (val == 32) this.reorient(1)
		};
	}//END Shape

	var engine = game.gameEngine;

	engine.shapes.shapeNames = ['line', 'plus'];
	
	engine.shapes.shapes = {
		line: [ 
				[[0,0,false,{left: true, right: true}],[0,1,false,{left: true, right: true}],[0,2,true,{left: true, right: true}]] , 
				[[-1,0,true,{left: true, right: false}],[0,0,true,{left: false, right: false}],[1,0,true,{left: false, right: true}]] 
			],
		plus: [  
				[ [-1, 0, true, {left: true, right: false}] , [0, 0, false, {left: false, right: false}], [1, 0, true, {left: false, right: true}], [0, 1, true, {left: true, right: true}] ],
				[ [0, 0, false, {left: true, right: true}] , [0, 1, false, {left: true, right: false}], [0, 2, true, {left: true, right: true}], [1, 1, true, {left: false, right: true}] ], 
				[ [-1, 1, true, {left: true, right: false}] , [0, 1, true, {left: false, right: false}], [1, 1, true, {left: false, right: true}], [0, 0, false, {left: true, right: true}] ],
				[ [0, 0, false, {left: true, right: true}] , [0, 1, false, {left: false, right: true}], [0, 2, true, {left: true, right: true}], [-1, 1, true, {left: true, right: false}] ],
			],
		upstair: [
				[ [], [], [], [] ],
				[ [] ,[] ,[] ,[] ]
			],
		downstair: [
				[[], [], [], []],
				[[] ,[] ,[] ,[]]
			]
	};

	engine.shapes.create = function createShape() {
		return new Shape( engine.shapes.shapeNames.randFromArr() );
	};

}());








