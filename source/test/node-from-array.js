const test = require('tape');

const nodeFromArray = require('../node-from-array');
const createClock = require('../create-clock');

test('nodeFromArray', assert => {
  const msg = 'should return an observable node that emits array values';

  const expected = [3, 6, 9];
  const actual = [];
  const clock = createClock({
    timer: 5
  });

  nodeFromArray({
    clock,
    array: expected
  }).subscribe({
    next (val) {
      actual.push(val);
    },
    complete () {
      assert.same(actual, expected, msg);
      assert.end();
    }
  });

  clock.start();
});
