UntransformedEmitters['call'] = 
function(n, flags, isStmt) {
  var hasParen = flags & EC_NEW_HEAD;
  var cb = CB(n); this.emc(cb, 'bef');
  if (hasParen) { this.w('('); } 
  if (n.mem !== null)
    this.jz('cm').w('(').eN(n.head, EC_NONE, false)
      .w(',').os().eN(n.mem, EC_NONE, false);
  else
    this.jz('c').w('(').eN(n.head, EC_NONE, false);

  this.w(',').os();
  this.jz('arr').w('(').emitElems(n.list, true, cb);
  this.w(')').w(')');
  
  hasParen && this.w(')');
  isStmt && this.w(';');

  return true;
};