function Path(type, similiraties){
  this.type = type || null;
  this.similiraties = similiraties || [];
}

Path.prototype = {
}

function createPath(type, similiraties){
  return new Path(type, similiraties);
}

module.exports = {
  create : createPath
}
