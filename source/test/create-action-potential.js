const test = require('tape');

const createActionPotential = require('../create-action-potential');

test('createActionPotential', assert => {
  const msg = 'should return an action potential array';
  const actual = createActionPotential({
    ticksPerMs: 1,
    depolarizationMs: 1,
    repolarizationMs: 1,
    refractoryMs: 3,
    min: -0.1,
    max: 1,
    restingPotential: 0
  });

  const expected = [ 0, 1, -0.1, -0.07500000000000001, -0.025000000000000012, 0 ];

  assert.same(actual, expected, msg);
  assert.end();
});
