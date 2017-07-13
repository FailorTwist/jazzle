Emitters['ObjectExpression'] =
function(n, flags, isStmt) {
  var list = n.properties, ci = n['#ci'], e = 0;
  var hasParen = false;
  if (ci >= 0) {
    hasParen = flags & EC_NEW_HEAD;
    hasParen && this.w('(');
    this.jz('obj').w('(');
  } else {
    hasParen = flags & EC_START_STMT;
    hasParen && this.w('(');
  }
  this.w('{');

  var item = null, last = ci >= 0 ? ci : list.length;
  while (e < last) {
    item = list[e];
    if (e) this.w(',').s();
    this.writeMemName(item.key, false).w(':').s().eN(item.value, EC_NONE, false);
    e++;
  }

  this.w('}');

  if (ci >= 0) {
    while (e < list.length) {
      this.w(',').s();
      item = list[e];
      if (item.computed)
        this.eN(item.key, EC_NONE, false);
      else
        this.w("'")
            .writeMemName(item.key, true).w("'");
      this.w(',').s().eN(item.value, EC_NONE, false);
      e++;
    }
    this.w(')');
  }

  hasParen && this.w(')');

  isStmt && this.w(';');
  return true;
};