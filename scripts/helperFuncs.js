
//returns random element from array
Array.prototype.randFromArr = function() {
  a= this[Math.floor(Math.random() * this.length)]
  console.log(a)
  return a
}

