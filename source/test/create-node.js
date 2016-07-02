const test = require('tape');

const createNode = require('../create-node');
const createClock = require('../create-clock');

test('simple node', assert => {
  const msg = 'should create an observable node from a clock';
  const actual = [];
  const expected = [1, 2, 3, 4, 5];

  const clock = createClock({
    timer: 5
  });

  createNode(clock).subscribe({
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

test('node.complete()', assert => {
  const msg = 'should unsubscribe and call listener complete()';

  const actual = [];
  const expected = [1, 2, 3];

  const clock = createClock({
    timer: 5
  });

  const node = createNode(clock);

  node.subscribe({
    next (val) {
      actual.push(val);
      if (val === 3) node.complete();
    },
    complete () {
      assert.same(actual, expected, msg);
      assert.end();
    }
  });

  clock.start();
});

test('map node', assert => {
  const msg = 'should return a node that emits mapped values';

  const doubled = [];

  const clock = createClock({
    timer: 5
  });

  createNode(clock)
    .map(val => val * 2)
    .subscribe({
      next (val) {
        doubled.push(val);
      },
      complete () {
        const expected = [2, 4, 6, 8, 10];
        const actual = doubled;

        assert.same(actual, expected, msg);
        assert.end();
      }
    });

  clock.start();
});


test('mapped map', assert => {
  const msg = 'should be able to stack maps';

  const doubled = [];

  const clock = createClock({
    timer: 5
  });

  createNode(clock)
    .map(val => val * 2)
    .map(val => val + 1)
    .subscribe({
      next (val) {
        doubled.push(val);
      },
      complete () {
        const expected = [3, 5, 7, 9, 11];
        const actual = doubled;

        assert.same(actual, expected, msg);
        assert.end();
      }
    });

  clock.start();
});

test('multiple subscribers', assert => {
  const msg = 'should work with multiple subscribers';

  const actual = {
    a: [],
    b: []
  };

  const expected = {
    a: [2, 4, 6, 8, 10, Infinity],
    b: [1, 2, 3, 4, 5, Infinity]
  };

  const clock = createClock({
    timer: 5
  });

  const source = createNode(clock);

  source.map(n => n * 2).subscribe({
    next (n) {
      actual.a.push(n);
    },
    complete () {
      actual.a.push(Infinity);
    }
  });

  source.subscribe({
    next (n) {
      actual.b.push(n);
    },
    complete () {
      actual.b.push(Infinity);
      assert.same(actual, expected, msg);
      assert.end();
    }
  });

  clock.start();
});
