this.tr =
function(n, ownerBody, isVal) {
  var ntype = n.type;
  switch (ntype) {
  case 'Literal':
  case '#Untransformed':
    return n;
  }

  var transformer = null;
  if (HAS.call(TransformerList, ntype))
    transformer = TransformerList[ntype];

  if (transformer === null)
    throw new Error('could not find <'+ntype+'>-transformer');

  return transformer.call(this, n, ownerBody, isVal);
};

this.setTS =
function(ts) {
  var ts0 = this.tempStack;
  this.tempStack = ts;
  return ts0;
};

this.setScope =
function(scope) {
  var cur = null;
  this.cur = scope ;
  return cur;
};
