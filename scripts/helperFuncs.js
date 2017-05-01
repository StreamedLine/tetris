
//returns random element from array
Array.prototype.randFromArr = function() {
  return this[Math.floor(Math.random() * this.length)]
}

