function createShapes(){
	function Shape(name) {
		var sd = 0, //distance from top
			sx = 10; //distance from left side	
		this.coloring = engine.shapes.colorMap[name];
		this.shapeMap = engine.shapes.shapes[name]; 
		this.orientation = 0;
		this.focused = true;
		this.done = false;
		this.sd = function(){return sd };
		this.sx = function(){return sx };
		this.calculatePositions = function() {
			var guide = this.shapeMap[this.orientation];
			return guide.map(function(pos){
				return [sx + pos[0], sd + pos[1]];
			});
		}
		this.gravity = function() {
			var positions = this.calculatePositions(),
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

			this.calculatePositions().forEach(function(pos){
				game.screen.xLines[pos[1]][pos[0]].chr = ' '
			});

			var ortn = this.orientation += val;
			if (ortn < 0) {this.orientation = this.shapeMap.length-1}
			if (ortn >= this.shapeMap.length) {this.orientation = 0}
			var taken = this.calculatePositions().some(function(pos){
				return pos[0] <= 0 || pos[0] >= game.screen.xLines[0].length ||
					   pos[1] <= 0 || pos[1] >= game.screen.xLines.length ||
					   game.screen.xLines[pos[1]][pos[0]].chr != ' '
			});
			if (taken) {
				this.orientation = original;
				this.calculatePositions().forEach(function(pos){
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
			var positions = this.calculatePositions(),
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
			var positions = this.calculatePositions(),
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

			if (val == 40) {
				game.refreshRate = 50
			}
		};
	}//END Shape

	var engine = game.gameEngine;

	engine.shapes.shapeNames = ['line', 'plus', 'cube', 'downstair'];
	
	engine.shapes.shapes = {
		line: [ 
				[[0,0,false,{left: true, right: true}],[0,1,false,{left: true, right: true}],[0,2,true,{left: true, right: true}]] ,  //vertical
				[[-1,0,true,{left: true, right: false}],[0,0,true,{left: false, right: false}],[1,0,true,{left: false, right: true}]] //horizontal
			],
		plus: [  
				[ [-1, 0, true, {left: true, right: false}] , [0, 0, false, {left: false, right: false}], [1, 0, true, {left: false, right: true}], [0, 1, true, {left: true, right: true}] ], //facedown
				[ [0, 0, false, {left: true, right: true}] , [0, 1, false, {left: true, right: false}], [0, 2, true, {left: true, right: true}], [1, 1, true, {left: false, right: true}] ],   //faceright
				[ [-1, 1, true, {left: true, right: false}] , [0, 1, true, {left: false, right: false}], [1, 1, true, {left: false, right: true}], [0, 0, false, {left: true, right: true}] ], //faceup
				[ [0, 0, false, {left: true, right: true}] , [0, 1, false, {left: false, right: true}], [0, 2, true, {left: true, right: true}], [-1, 1, true, {left: true, right: false}] ]  //faceleft
			],
		downstair: [
				[ [-1, 0, false, {left: true, right: true}], [-1, 1, true, {left: true, right: false}], [0, 1, false, {left: false, right: true}], [0, 2, true, {left: true, right: true}] ],
				[ [-1, 2, true, {left: true, right: false}], [0, 1, false, {left: true, right: false}], [0, 2, true, {left: false, right: true}], [1, 1, true, {left: false, right: true}]]
			],
		upstair: [
				[[], [], [], []],
				[[] ,[] ,[] ,[]]
			],
		cube: [[[0,0, false, {left: true, right: false}], [1,0, false, {left: false, right: true}], [0,1, true, {left: true, right: false}], [1,1, true, {left: false, right: true}]]],
		hook: []
	};

	engine.shapes.colorMap = {
		line: 'red', 
		plus: 'darkcyan', 
		cube: 'green', 
		downstair: 'blue'
	}

	engine.shapes.create = function createShape() {
		return new Shape( engine.shapes.shapeNames.randFromArr() );
	};

};

createShapes();