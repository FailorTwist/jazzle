this.insideUniqueArgs =
function() { return this.flags & SF_UNIQUE; };

this.exitUniqueArgs =
function() {
  ASSERT.call(this, !this.inBody,
    'must be in args');
  ASSERT.call(this, this.insideUniqueArgs(),
    'must be in unique args');
  this.flags &= ~SF_UNIQUE;
};

this.enterUniqueArgs =
function() {
  if (!this.canDup())
    return;

  this.verifyForUniqueArgs();
  this.flags |= SF_UNIQUE;
};

this.verifyUniqueArgs =
function() { this.firstDup && this.parser.err('argsdup'); };
