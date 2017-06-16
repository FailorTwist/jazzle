this.s =
function(s) {
  ASSERT_EQ.call(this, this.site, null);
  this.site = s;
  return this;
};

this.r =
function(r) {
  ASSERT_EQ.call(this, this.ref, null);
  ASSERT_EQ.call(this, r.targetDecl, null);
  ASSERT_EQ.call(this, r.hasTarget, false);
  this.ref = r;
  r.targetDecl = this;
  r.hasTarget = true;
  return this;
};

this.n =
function(n) {
  ASSERT_EQ.call(this, this.name, "");
  this.name = n;
  return this;
};

this.t =
function(t) {
  ASSERT_EQ.call(this, this.type, DT_NONE);
  this.type = t;
  return this;
};

this.referTo =
function(target) {
  var ref = this.ref;
  ASSERT.call(this, this.ref.scope.isSourceLevel(), 'source level');
  ASSERT.call(this, this !== target.ref.getDecl(), 'not itself');
  ref.cut();
  target.ref.updateRSList(ref.rsList);
  target.ref.updateStats(ref.i, ref.d );
  target.ref.rsList.push(ref.scope);
  ref.hasTarget = false;
  ref.targetDecl = null;
  this.ref.parentRef = target.ref;
  return this;
};

this.activateTZ =
function() {
  if (this.hasTZCheck)
    return false;
  this.hasTZCheck = true;
  this.ref.scope.activateTZ();
  return true;
};

this.isReached =
function() {
  return this.reached && this.reached.v;
};
