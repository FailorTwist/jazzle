Emitters['ReturnStatement'] = function(n, prec, flags) {
  this.w('return');
  if (n.argument)
    this.noWrap().s().emitAny(n.argument, false, EC_NONE);
  this.w(';');
};
