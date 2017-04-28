(function createEngine(){
	var engine = {
		shapes: {
			shapesArr:[], //{gravity: function(){}, locations: []}
			gravity: function() {
				this.shapesArr.forEach(function(shape){
					shape.gravity();
				});
			}
		},
		map: game.screen
	};


	engine.advance = function advance() {
		engine.shapes.gravity();
	}

	game.gameEngine = engine
}());


(function createShapes(){
	function Shape(name) {
		var sd = 0, //distance from top
			sx = 6; //should be random without going beyond edge
		this.shapeMap = shapes[name];
		this.orientation = 0;
		this.done = false;
		this.gravity = function() {
			//check screen to see if it can drop further
		}
	}

	var shapeNames = ['line', 'plus'];
	var shapes = {
		line: [ [[0,0],[0,1],[0,2]] , [[-1,0],[0,0],[1,0]] ],
		plus: 'dev'
	};



}());








