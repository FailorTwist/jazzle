Emitters['DoWhileStatement'] = function(n, prec, flags) {
  this.w('do').emitDependentStmt(n.body);
  if (n.body.type !== 'BlockStatement')
    this.l();
  this.wm('while',' ','(').eA(n.test, false, EC_NONE).w(')');
};
