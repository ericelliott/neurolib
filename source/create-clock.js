/*
This lets us schedule events independent of time. Instead of expressing
time in realtime units like ms, we schedule in ticks. That way we can
change the time resolution and the network will still sync correctly.

Uses automatic jitter correction, so even if you use setTimeout() it
shouldn't wander wildly off the beat.
*/

const createClock = ({
  scheduler = setTimeout,  // A setTimeout() compatible scheduling API.
  tickDelay = 20,          // Ms per tick.
  timer = 0                // A countdown timer in ticks.
                           //   Stops the clock after x ticks.
} = {}) => {
  let isTicking = false;
  let ticks = 0;           // Elapsed ticks.
  let lastTick = Date.now();
  let lastDelay = tickDelay;
  const observers = {};
  let clock = {};

  const tick = () => {
    ticks += 1;

    Object.getOwnPropertySymbols(observers).forEach(key => {
      const next = observers[key].next;
      if (typeof next === 'function') next(ticks);
    });

    if (timer > 0 && ticks >= timer) clock.stop();

    if (isTicking) {
      const now = Date.now();
      const elapsed = now - lastTick;
      const diff = elapsed - lastDelay;
      const correctDelay = Math.abs(tickDelay - diff);

      lastTick = now;
      lastDelay = correctDelay;
      scheduler(tick, correctDelay);
    }
  };

  // The clock API.
  clock = {
    start () {
      isTicking = true;
      scheduler(tick, tickDelay);
      return this;
    },
    stop () {
      Object.getOwnPropertySymbols(observers).forEach(key => {
        const complete = observers[key] && observers[key].complete;
        if (typeof complete === 'function') complete(ticks);
      });

      isTicking = false;
      return this;
    },
    get ticks () {
      return ticks;
    },
    get scheduler () {
      return scheduler;
    },
    get tickDelay () {
      return tickDelay;
    },
    get timer () {
      return timer;
    },
    get isTicking () {
      return isTicking;
    },

    // An ES-Observable-inspired API.
    // We want strict control over timing, so we won't use a 3rd party lib.
    // observer has next() and complete() and ignores error handling.
    subscribe (observer) {
      const symbol = Symbol();
      observers[symbol] = observer;
      return {
        unsubscribe () {
          delete observers[symbol];
        }
      };
    }
  };

  return clock;
};

module.exports = module.exports.default =
  module.exports.createClock = createClock;
