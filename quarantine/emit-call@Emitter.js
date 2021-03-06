Emitters['CallExpression'] = function(n, prec, flags) {
  var ri = spreadIdx(n.arguments, 0); 
  if (ri !== -1)
    return this.emitCallWithSpread(n, flags, ri);
  
  var paren = flags & EC_NEW_HEAD;
  if (paren) {
    flags = EC_NONE;
    this.w('(');
  }

  this.eH(n.callee, false, flags|EC_CALL_HEAD);
  this.w('(');
  this.emitArrayChunk(n.arguments, 0, n.arguments.length-1);
  this.w(')');

  if (paren) this.w(')');
};

this.emitCallWithSpread =
function(n, flags, ri) {
  var paren = flags & EC_NEW_HEAD;
  if (paren) {
    flags = EC_NONE;
    this.w('(');
  }

  var c = n.callee;
  if (c.type === 'MemberExpression') {
    this.jz('meth').w('(')
        .jz('b').w('(')
        .eN(c.object, PREC_NONE, EC_NONE)
        .wm(',',' ');
    if (c.computed)
      this.eN(c.property, PREC_NONE, EC_NONE);
    else 
      this.emitStringLiteralWithRawValue("'"+c.property.name+"'");
    this.w(')');
  } else {
    this.wm('jz','.','call','(')
        .eN(c, PREC_NONE, EC_NONE);
  }
  this.wm(',',' ')
      .emitArrayWithSpread(n.arguments, EC_NONE, ri);
  this.w(')');
  if (paren) this.w(')');
};  

