  import Decl from '../Decl/cls.js';

function ScopeName(name, src) {
  Decl.call(this);

  this.name = name;
  this.source = src;
}

 export {ScopeName};

 import {createObj} from '../other/util.js';
 export var cls = ScopeName.prototype = createObj(Decl.prototype);