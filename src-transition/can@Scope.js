this.canSmem =
function() { return this.allowed & SF_MEMSUP; };

this.canAwait = 
function() { return this.allowed & SF_AWAIT; };

this.canBreak = 
function() { return this.allowed & SF_BREAK; };

this.canDeclareLetOrConst =
function() {
  if (this.isBlock() ||
    this.isModule() ||
    this.isScript())
    return true;

  if (this.isAnyFn() || this.isCatch())
    return this.inBody;
  
  return this.insideForInit();
};

this.canScall = 
function() { return this.allowed & SF_CALLSUP; };

this.canDeclareFn =
function(st) {
  if (this.isBlock() ||
    this.isModule() ||
    this.isScript())
    return true;

  if (this.isAnyFn() || this.isCatch())
    return this.inBody;

  ASSERT.call(this, this.isBare(),
    'a bare scope was expected but got '+
    this.typeString());

  if (st & (ST_GEN|ST_ASYNC))
    return false;

  return this.insideIf();
};

this.canYield = 
function() { return this.allowed & SF_YIELD; };

this.canReturn = 
function() { return this.allowed & SF_RETURN; };

this.canContinue = 
function() { return this.allowed & SF_CONTINUE; };
