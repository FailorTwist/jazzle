Emitters['UnaryExpression'] = 
function(n, flags, isStmt) {
  var o = n.operator;
  var hasParen = flags & EC_EXPR_HEAD;
  if (hasParen) { this.w('('); flags = EC_NONE; }
  var lastChar = this.code.charAt(this.code.length-1) ;
  lastChar === o && this.s();
  this.w(o);

  switch (o) {
  case 'void': case 'delete': case 'typeof':
    this.s();
  }

  this.emitUA(n.argument);
  hasParen && this.w(')');
  isStmt && this.w(';');
  return true;
};

this.emitUA = function(n) {
  switch (n.type) {
  case 'UnaryExpression':
  case 'UpdateExpression':
    return this.emitAny(n, EC_NONE, false);
  }
  return this.emitHead(n, EC_NONE, false);
};