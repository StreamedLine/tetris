var game = {
	refreshRate: 500, 

	screen: null,
	gameEngine: null,

	screenAsString: function() {
		return this.screen.xLines.map(function(line){
			return line.map(function(ob){return ob.chr}).join('')
		}).join('\n')
	},

	nextFrame: function(){
		this.gameEngine.advance();
		console.log('next frame');
		this.insertFrameInDom(this.screenAsString())
	},

	insertFrameInDom: function(str){
		screenTag.innerText = str 
	},

	gameOver: function() {return false}
};
