  import {Transformers} from '../other/globals.js';
  import {cls} from './cls.js';

Transformers['SequenceExpression'] =
function(n, isVal) {
  this.trList(n.expressions, isVal);
  return n;
};

