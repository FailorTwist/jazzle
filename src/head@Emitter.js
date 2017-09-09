this.emitSourceHead =
function(n) {
  var scope = n['#scope'], em = 0;
  this.emitTCheckVar(scope, em) && em++;
  this.emitThisRef(scope, em) && em++;
  this.emitFunLists(scope, true, em) && em++;
  this.emitVarList(scope, em) && em++;
  this.emitTempList(scope, em) && em++;
  return em;
};

this.emitFnHead =
function(n) {
  var scope = n.fun['#scope'], em = 0;
  this.emitTCheckVar(scope, em) && em++;
  this.emitTempList(scope, em) && em++;
  this.emitThisRef(scope,em) && em++;
  this.emitThisChk(scope,em) && em++;
  this.emitArgumentsRef(scope,em) && em++;
  if (n.argsPrologue) this.emitTransformedArgs(n, em) && em++;
  this.emitFunLists(scope, true, em) && em++;
  this.emitVarList(scope, em) && em++;
  return em;
};

this.emitSimpleHead =
function(n) {
  var scope = n['#scope'], em = 0;
  scope.hasTZCheckPoint && this.emitTCHP(scope, em) && em++;
  this.emitLLINOSAList(scope, em) && em++;
  this.emitFunLists(scope, false, em) && em++;
  return em;
};

this.emitVarList =
function(scope, hasPrev) {
  ASSERT.call(this, scope.isSourceLevel() || scope.isAnyFn(), 'source/fn');
  var u = null, own = false, o = {v: false};
  if (hasPrev) {
    if (!this.wcb) { own = true; this.onw(wcb_afterStmt); }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }
  var list = scope.defs, i = 0, len = list.length(), em = 0;
  while (i < len) {
    var elem = list.at(i++);
    if (!elem.isVar()) continue;
    if (elem.isFn() || elem.isFnArg()) continue;
    em ? this.w(',').os() : this.w('var').bs();
    this.w(elem.synthName);
    em++;
  }
  em && this.w(';');
  if (own) u.v || this.clear_onw();
  return em;
};

this.emitTempList =
function(scope, hasPrev) {
  ASSERT.call(this, scope.isSourceLevel() || scope.isAnyFn(), 'source/fn');
  var u = null, own = false, o = {v: false};
  if (hasPrev) {
    if (!this.wcb) { own = true; this.onw(wcb_afterStmt); }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }
  var list = scope.getLG('<t>'), i = 0, len = list ? list.length : 0;
  while (i < len) {
    var elem = list.getL(i);
    i ? this.w(',').os() : this.w('var').bs();
    this.w(elem.synthName);
    i++;
  }
  i && this.w(';');
  if (own) u.v || this.clear_onw();
  return i;
};

this.emitFunLists =
function(scope, allowsDecl, hasPrev) {
  var u = null;
  var o = {v: false};
  var own = false;

  if (hasPrev) {
    if (!this.wcb) { own = true; this.onw(wcb_afterStmt); }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }

  var list = scope.funLists, i = 0, len = list.length(), em = 0;
  while (i < len)
    this.emitFunList_subList(list.at(i++), allowsDecl, em) && em++;

  if (own) u.v || this.clear_onw();
  return em;
};

this.emitLLINOSAList =
function(scope, hasPrev) {
  ASSERT.call(this, !scope.isSourceLevel() && !scope.isAnyFn(), 'scope/fn');
  var u = null, own = false, o = {v: false};
  if (hasPrev) {
    if (!this.wcb) { own = true; this.onw(wcb_afterStmt); }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }

  var list = scope.defs, i = 0, len = list.length(), em = 0;
  while (i < len) {
    var elem = list.at(i++);
    if (!elem.isLLINOSA()) continue;
    em ? this.w(',').os() : this.w('var').bs();
    this.w(elem.synthName).os().w('=').os().wm('{','v',':','','void').bs().wm('0','}');
    em++;
  }
  em && this.w(';');
  if (own) u.v || this.clear_onw();
  return em;
};

this.emitFunList_subList =
function(funList, allowsDecl, hasPrev) {
  var u = null, own = false, o = {v: false};
  if (hasPrev) {
    if (!this.wcb) { own = true; this.onw(wcb_afterStmt); }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }

  var i = 0;
  while (i < funList.length) {
    this.emitSingleFun(funList[i], allowsDecl, i);
    i++;
  }

  if (own) u.v || this.clear_onw();
  return i;
};

this.emitThisRef =
function(scope, hasPrev) {
  var th = scope.spThis;
  if (th === null) return 0;
  if (th.ref.i === 0) return 0;

  var u = null;
  var own = false, o = {v: false};

  if (hasPrev) {
    if (!this.wcb) { own = true; this.onw(wcb_afterStmt); }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }

  this.w('var').bs().w(th.synthName).os().w('=').os().w('this').w(';');
  if (own) u.v || this.clear_onw();

  return 1;
};

this.emitSingleFun =
function(n, allowsDecl, i) {
  var scope = n.fun['#scope'];
  var o = {v: false};
  var own = false;

  var target = n.target;
  ASSERT.call(this, target, 'n.target' );
  var u = null;

  if (i) {
    if (!this.wcb) { own = true; this.onw(wcb_afterStmt); }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }

  if (allowsDecl && scope.scopeName.getAS() === ATS_SAME)
    this.emitTransformedFn(n, EC_NONE, true);
  else {
    var ll = target.isLLINOSA();
    if (i === 0 && !ll)
      this.w('var').bs();
    this.w(target.synthName);
    ll && this.wm('.','v');
    this.wm('','=','');
    n.target = null;
    scope.scopeName.synthName = scope.scopeName.name;
    this.emitExprFn(n, EC_NONE, false);
    this.w(';'); // could have been done above, with true instead of false
  }

  if (own) u.v || this.clear_onw();
};

this.emitTCheckVar =
function(scope, hasPrev) {
  var tg = scope.getLG('tz');
  if (tg === null) return 0;
  tg = tg.getL(0);
  var u = null, own = false, o = {v: false};
  if (hasPrev) {
    if (!this.wcb) { this.onw(wcb_afterStmt); own = true; }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }
  this.w('var').bs().w(tg.synthName).os().w('=').os().w(scope.di0+"").w(';');
  return 1;
};

this.emitTransformedArgs =
function(n, hasPrev) {
  var ta = n.argsPrologue;
  if (ta === null)
    return 0;
  var own = false;
  var o = {v: false};
  var u = null;
  var b = CB(n.fun);

  if (hasPrev) {
    if (!this.wcb) { this.onw(wcb_afterStmt); own = true; }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }
  
  this.emitStmt(ta);
  this.emc(b, 'inner');

  if (own) u.v || this.clear_onw();
  return 1;
};

this.emitTCHP =
function(scope, hasPrev) {
  var tg = scope.scs.getLG('tz').getL(0);
  if (tg === null)
    return 0;
  var own = false;
  var o = {v: false};

  var u = null;
  if (hasPrev) {
    if (!this.wcb) { this.onw(wcb_afterStmt); own = true; }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }

  this.wm(tg.synthName,'=',scope.di0+"",';');

  if (own) u.v || this.clear_onw();
  return 1;
};

this.emitArgumentsRef =
function(scope, hasPrev) {
  var ar = scope.spArguments;
  if (ar === null) return 0;
  if (ar.ref.i === 0) return 0;
  var own = false;
  var o = {v: false};

  var u = null;
  if (hasPrev) {
    if (!this.wcb) { this.onw(wcb_afterStmt); own = true; }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }

  this.wm('var',' ',ar.synthName,'','=','','arguments',';');

  if (own) u.v || this.clear_onw();
  return 1;
};

this.emitThisChk =
function(scope, hasPrev) {
  var ti = scope.getLG('ti');
  if (ti === null) return 0;
  ti = ti.getL(0);
  if (ti === null) return 0;

  var own = false;
  var o = {v: false};

  var u = null;
  if (hasPrev) {
    if (!this.wcb) { this.onw(wcb_afterStmt); own = true; }
    if (!this.wcbUsed) this.wcbUsed = u = o;
    else u = this.wcbUsed;
  }

  this.wm('var',' ',ti.synthName,'','=','','0',';');

  if (own) u.v || this.clear_onw();
  return 1;
};
