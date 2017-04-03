transform['Program'] = function(n, list, isVal) {
  var b = n.body, i = 0;
  this.scriptScope = n.scope;
  this.globalScope = this.scriptScope.parent;

  var ps = this.setScope(this.scriptScope);
  this.currentScope.startupSynthesis();
  while (i < b.length) {
    b[i] = this.transform(b[i], null, false);
    i++;
  }
  this.currentScope.endSynthesis();

  if (this.currentScope.special.lexicalThis)
    this.currentScope.synthesizeThis();

  this.setScope(ps);
  return n;
};
