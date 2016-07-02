const test = require('tape');

const createClock = require('../create-clock');

test('clock minimum delay', assert => {
  const clock = createClock({
    tickDelay: 40
  }).start();

  let preTick = 35;
  let postTick = 45;

  setTimeout(() => {
    const msg = 'should delay first tick correctly';
    const expected = 0;
    const actual = clock.ticks;
    assert.same(actual, expected, msg);
  }, preTick);

  setTimeout(() => {
    const msg = 'should tick after delay';
    const actual = clock.ticks;
    const expected = 1;
    assert.same(actual, expected, msg);
    assert.end();
    clock.stop();
  }, postTick);
});

test('stop after x ticks', assert => {
  const msg = 'should stop after x ticks when timer is specified';

  const clock = createClock({
    timer: 20
  });

  clock.start();

  clock.subscribe({
    complete (n) {
      const actual = clock.ticks;
      const expected = 20;

      assert.same(actual, expected, msg);
      assert.same(n, expected, 'should pass tick count into complete()');
      assert.end();
    }
  });
});

test('notify on tick', assert => {
  const msg = 'should notify subscribers of each tick';
  const ticks = [];

  const clock = createClock({
    timer: 5
  });

  clock.start();

  clock.subscribe({
    next (n) {
      ticks.push(n);
    },
    complete () {
      const actual = ticks;
      const expected = [1, 2, 3, 4, 5];

      assert.same(actual, expected, msg);
      assert.end();
    }
  });
});
