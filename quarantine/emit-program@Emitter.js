Emitters['Program'] = function(n, prec, flags) {
  this.emitTopLevelBindings(n.scope);

  var list = n.body, i = 0;

  while (i < list.length) {
    var stmt = list[i++];
    i > 0 && this.startLine();
    this.emitAny(stmt, true, EC_START_STMT);
  }
};
