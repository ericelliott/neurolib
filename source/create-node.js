function createNode (inputObservable, { mapFn = v => v } = {}) {
  let listenerComplete = () => {};
  let subscription = {};

  const outputObservable = {
    map (fn) {
      return createNode(this, {
        mapFn: fn
      });
    },
    subscribe ({ next, complete }) {
      listenerComplete = complete;

      subscription = inputObservable.subscribe({
        next (val) {
          next(mapFn(val));
        },
        complete
      });

      return subscription;
    },
    complete () {
      subscription.unsubscribe();
      listenerComplete();
    }
  };

  return outputObservable;
}

module.exports.createNode = module.exports.default = module.exports = createNode;
