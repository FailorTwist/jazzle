this.parseNew =
function() {
  this.resvchk();
  var c0 = this.c0, loc0 = this.loc0();
  var c = this.c, li = this.li, col = this.col;

  this.next(); // 'new'
  if (this.lttype === CH_SINGLEDOT) {
    this.next();
    return this.parseMeta(c0,loc0,c,li,col);
  }

  var head = this.parseExprHead(CTX_NONE);
  if (head === null)
    this.err('new.head.is.not.valid');

  var inner = core(head) ;

  while (true)
  switch (this.lttype) {
  case CH_SINGLEDOT:
    this.next();
    if (this.lttype !== TK_ID)
      this.err('mem.name.not.id');
    elem = this.memberID();
    if (elem === null)
      this.err('mem.id.is.null');
    head = inner = {
      type: 'MemberExpression',
      property: elem,
      start: head.start,
      end: elem.end,
      object: inner,
      loc: {
        start: head.loc.start,
        end: elem.loc.end },
      computed: false,
      '#y': -1
    };
    continue;

  case CH_LSQBRACKET:
    this.next();
    elem = this.parseExpr(PREC_NONE, CTX_NONE);
    head = inner = {
      type: 'MemberExpression',
      property: core(elem),
      start: head.start,
      end: this.c,
      loc: {
        start: head.loc.start,
        end: this.loc() },
      computed: true,
      '#y': -1
    };
    if (!this.expectType_soft(CH_RSQBRACKET))
      this.err('mem.unfinished');
    continue;

  case CH_LPAREN:
    elem = this.parseArgList();
    head = inner = {
      type: 'NewExpression',
      callee: inner,
      start: head.start,
      end: this.c,
      arguments: elem,
      loc: {
        start: head.loc.start,
        end: this.loc() },
      '#y': -1
    };
    if (!this.expectType_soft(CH_RPAREN))
      this.err('new.args.is.unfinished');
    continue;

  case CH_BACKTICK:
    elem = this.parseTemplateLiteral();
    head = inner = {
      type: 'TaggedTemplateLiteral',
      quasi: elem,
      start: head.start,
      end: elem.end,
      loc: {
        start: head.loc.start,
        end: elem.loc.end },
      tag: inner,
      '#y': -1
    };
    continue;

  default:
    return {
      type: 'NewExpression',
      callee: inner,
      start: c0,
      end: head.end,
      loc: {
        start: loc0,
        end: head.loc.end },
      arguments : [],
      '#y': -1
    };
  }
};