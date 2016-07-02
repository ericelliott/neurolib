/*
preterminal.delay

How long should transmission be delayed after the presynaptic
neuron fires?

Action potentials can propogate at variable rates between
.1 meters/sec - 100 meters/sec, and axon lengths can vary from
tiny distances to up to 4 meters. Typically the delay falls in
the range of .1ms - 100ms.

.1ms - 10ms is probably the most useful range.
*/
const preTerminal = ({
  input,                         // observable input signal
  delay = 0,                     // axonal delay in ms
  strength = .2,                 // how strong should output be? 0 - 1
  saturation = signal(),         // neurotransmitter cleft saturation
  diffuseTime = 2                // diffusion time in ms
} = {}) => {
  const output = signal();

  return {
    output // an observable output signal
  }
}

const postTerminal = ({
  receptorDensity = 1
} = {}) => ({
  receptorDensity
});

const synapse = ({
  preTerminal = preTerminal(),
  postTerminal = postTerminal()
} = {}) => ({
  preTerminal, postTerminal
});
