/*
A neuron is basically the sum of its synapses.
Along with a trigger threshold, that's all we need to calculate
whether or not it will trigger at any given moment:
*/
const neuron = ({ synapses = [], threshold = .3 } = {}) => ({
  synapses,
  threshold
});

/*
Each synapse has a weight from 0 to 1, and a current value from -1 to +1.
*/
const synapse = ({ weight = .1, value = 0 } = {}) => ({
  weight, value
});

/*
A simple function can take a neuron's threshold and
synapses as input, sum the results, and determine
whether or not to fire.
*/
const shouldTrigger = ({ threshold, synapses }) => {
  const sum = synapses.reduce(
    (amplitude, { weight, value }) => amplitude + (weight * value), 0);
  return sum >= threshold;
}

const neuron1 = neuron({ synapses: [
    synapse({ value: -.2 }),
    synapse({ weight: 0, value: 1 }), // no effect
    synapse({ weight: .5, value: .8})
  ],
  threshold: .3
});

// Identical except for the threshold
const neuron2 = neuron({ synapses: [
    synapse({ value: -.2 }),
    synapse({ weight: 0, value: 1 }), // no effect
    synapse({ weight: .5, value: .8})
  ],
  threshold: .5
});

const willTriggerN1 = shouldTrigger(neuron1); // true
const willTriggerN2 = shouldTrigger(neuron2); // false

console.log(`
  ${ willTriggerN1 }
  ${ willTriggerN2 }
`);
