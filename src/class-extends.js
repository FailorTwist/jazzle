ConcreteScope.prototype = createObj(Scope.prototype);
GlobalScope.prototype = createObj(Scope.prototype);
FunScope.prototype = createObj(ConcreteScope.prototype);
 ModuleScope.prototype = createObj(ConcreteScope.prototype);
ClassScope.prototype = createObj(Scope.prototype);
CatchScope.prototype = createObj(Scope.prototype);
 ParenScope.prototype = createObj(Scope.prototype);
ScopeName.prototype = createObj(Decl.prototype);