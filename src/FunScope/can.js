  import {ASSERT} from '../other/constants.js';
  import {cls} from './cls.js';

this.canDup =
function() {
  ASSERT.call(this, !this.inBody,
    'canDup allowed in args only');
  return !this.insideUniqueArgs() &&
         !this.insideStrict();
};

