const createActionPotential = require('../source/create-action-potential');
const createClock = require('../source/create-clock');
const nodeFromArray = require('../source/node-from-array');

const clock = createClock({
  tickDelay: 500
});

const node = nodeFromArray({
  clock,
  array: createActionPotential({
    ticksPerMs: 1
  })
});

node.subscribe({
  next (val) {
    console.log(val);
  },
  complete () {
    console.log('complete');
  }
});

clock.start();
