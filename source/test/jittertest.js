const test = require('tape');

const createClock = require('../clock');

test('clock tick count', assert => {
  const msg = 'should tick the correct number of times';
  const clock = createClock({
    tickDelay: 20
  }).start();

  let wait = 54518;
  const expected = 2725;

  setTimeout(() => {
    const actual = clock.ticks;
    clock.stop();
    assert.same(actual, expected, msg);
    assert.end();
  }, wait);
});
