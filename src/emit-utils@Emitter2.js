// write a string value as an ECMAScript string, but without quotes
this.writeStringValue =
function(sv,ql) {
  var ch = -1, len = sv.length, o = 0, v = "";
  while (o<len) {
    v = sv.charAt(o);
    ch = sv.charCodeAt(o);
    if (!this.isStringCh(ch))
      v = stringEscapeFor(ch);
    var l = v.length;
    if (o === len-1)
      l  += ql;
    if (this.ol(l) > 0) {
      this.rwr('\\');
      this.l();
      this.curLineIndent = 0;
    }
    this.rwr(v);
  }

  return this;
};

this.isStringCh =
function(ch) {
  switch (ch) {
  case CH_BACK_SLASH:
  case CH_SINGLE_QUOTE:
  case CH_MULTI_QUOTE:
    return false;
  }

  return ch <= CH_COMPLEMENT && ch >= CH_WHITESPACE;
};

this.stringEscapeFor =
function(ch) {
  switch (ch) {
  case CH_BACK_SLASH: return '\\\\';
  case CH_SINGLE_QUOTE: return '\\\'';
  case CH_MULTI_QUOTE: return '\\\"';
  case CH_VTAB: return '\\v';
  case CH_BACK: return '\\b';
  case CH_FORM_FEED: return '\\f';
  case CH_TAB: return '\\t';
  case CH_CARRIAGE_RETURN: return '\\r';
  case CH_LINE_FEED: return '\\n';
  default:
    if (ch<=0xFF)
      return '\\x'+hex2(ch);

    ASSERT.call(this, ch <= 0xFFFF, 'ch not a 16bit');
    return '\\u'+hex(ch);
  }
};

this.writeIDName =
function(nameStr) {
  return this.w(nameStr);
};

this.wsndl =
function(list) {
  var e = 0;
  while (e < list.length) {
    e && this.wm(',','');
    this.writeIDName(list[e].synthName);
    ++e ;
  }
  return true;
};

this.writeMemName =
function(memName, asStr) {
  switch (memName.type) {
  case 'Literal':
    return this.eA(memName, EC_NONE, false);
  case 'Identifier':
    return asStr ?
      this.t(ETK_STR).writeString(memName.name,"'").rtt() :
      this.writeIDName(memName.name);
  }
  ASSERT.call(this, false, 'unknown name');
};

this.writeString =
function(quotation,sv) {
  this.w(quotation); // rwr is not used, because it might invove wrapping
  this.writeStringValue(sv,1);
  this.rwr(quotation); // rwr because the wrapping-thing is taken care of when calling writeStringValue
};

this.emitCommaList =
function(list, flags) {
  var e = 0;
  while (e < list.length) {
    if (e) this.wm(',','');
    this.eN(list[e], flags, false);
    if (e === 0) flags &= EC_IN;
    e++;
  }
  return this;
};

this.emitStmt =
function(stmt) {
  return this.eA(stmt, EC_START_STMT, true);
};

this.emitBody =
function(stmt) {
  switch (stmt.type) {
  case 'BlockStatement':
    this.os();
  case 'EmptyStatement':
    this.emitStmt(stmt);
    return true;
  }
  this.l().i();
  var em = this.emitAny(stmt, EC_START_STMT, true);
  this.u();
  if (em)
    return true;
  this.w(';'); // TODO: else; rather than else[:newline:]  ;
  return false;
};

this.emitStmtList =
function(list) {
  var emittedSoFar = 0, e = 0;
  var em = 0, hasOnW = this.wcb;
  while (e < list.length) {
    this.emitStmt(list[e++]);
    if (hasOnW && !this.wcb) {
      ++em;
      this.onw(onW_line);
      hasOnW = this.wcb;
    }
  }

  em && this.wcb && this.clear_onw();
  return emittedSoFar;
};

this.emitSAT =
function(n, flags) {
  if (n.type === 'MemberExpression')
    return this.emitSAT_mem(n, flags);
  if (isResolvedName(n))
    return this.emitRName_SAT(n, flags);

  ASSERT.call(this, false, 'got <'+n.type+'>');
};

this.emitWrappedInV =
function(n) {
  this.wm('{','v',':').s().eN(n, EC_NONE, false).w('}');
  return true;
};

this.v =
function() {
  return this.wm('.','v');
};

this.emitSpread =
function(n) { this.jz('sp').w('(').eN(n.argument, EC_NONE, false).w(')'); };

// a, b, e, ...l -> [a,b,e],sp(l)
// a, b, e, l -> a,b,e,l
this.emitElems =
function(list, selem /* i.e., it contains a spread element */) {
  var e = 0, em = 0;
  while (e < list.length) {
    em && this.w(',').os();
    var elem = list[e];
    if (elem && elem.type === 'SpreadElement') {
      this.emitSpread(elem);
      e++;
    }
    else {
      var br = selem || em;
      br && this.w('[');
      e = this.emitElems_toRest(list, e);
      br && this.w(']');
    }
    ++em;
  }
  return true;
};

this.emitElems_toRest =
function(list, s) {
  var e = s;
  while (e < list.length) {
    var elem = list[e];
    if (elem && elem.type === 'SpreadElement')
        break;
    e > s && this.w(',').os();
    if (elem)
      this.eN(elem, EC_NONE, false);
    else
      this.w('void').bs().w('0');
    ++e; 
  }
  return e;
};

this.emitAccessChk_tz =
function(nd) {
  ASSERT.call(this, nd.hasTZCheck, 'unnecessary tz');
  var scope = nd.ref.scope;
  ASSERT.call(this, scope.hasTZCheckPoint, 'could not find any tz');
  var tz = scope.scs.getLG('tz').getL(0);
  this.wm(tz.synthName,'<',nd.idx,'&&').jz('tz').w('(').writeString(nd.name, "'").w(')');
  return true;
};

this.emitAccessChk_invalidSAT =
function(nd) {
  this.jz('cc').w('(').writeString(nd.name,"'").w(')');
  return true;
};