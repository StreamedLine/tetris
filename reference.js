I saved this as a js file for the syntax highlighting (which I might not actually need...).
This document is for reference only.

dom.js
------

variables - goBtn        # button  for starting game
			screenTag    # <pre> tag for displaying the game on the screen 


===========


game.js
------

var game = {
	refreshRate: 500, 
	screen: null, //holds arrays full of the pixel objects
	screenAsString: function() {
		//returns screen as a string
	},
	nextFrame: function(){
		//this.insertFrameInDom(this.screenAsString)
	},
	insertFrameInDom: function(str){
		//screenTag.innerText = str 
	},
	gameOver: function() {/*is game over?*/}
}
==========


initScreen.js
------

var screen = {
	pixels: [], //array of all pixel objects
	xLines: [], //pixel objects split into sub arrays of horizontal lines
	yLines: []  //(not implenmented yet) like xLines but of vertical lines
};

=========


