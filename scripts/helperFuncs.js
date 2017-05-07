
//returns random element from array
Array.prototype.randFromArr = function() {
  a= this[Math.floor(Math.random() * this.length)]
  console.log(a)
  return a
}

function paddWithChr(chr, len) {
	var line = '';
	for (var i = 0; i < len; i++) {
		line += chr;
	}
	return line;
}
