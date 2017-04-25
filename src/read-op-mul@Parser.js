this.readOp_mul =
function() {
  var c = this.c; c++; // '*'
  var ch = this.scat(c);

  this.lttype = TK_SIMP_BINARY;
  if (ch === CH_EQUALITY_SIGN) {
    c++;
    this.prec = PREC_ASSIG;
    this.ltraw = '*=';
  }
  else if (ch === CH_MUL) {
    c++; ch = this.scat(c);
    if (ch === CH_EQUALITY_SIGN) {
      c++;
      this.prec = PREC_ASSIG;
      this.ltraw = '**=';
    }
    else {
      this.prec = PREC_MUL;
      this.ltraw = '**';
    }
  }
  else {
    this.prec = PREC_MUL;
    this.ltraw = '*';
  }

  this.setsimpoff(c);
};
