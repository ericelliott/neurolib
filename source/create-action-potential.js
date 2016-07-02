/*
This data is supposed to be a rounded wave-form,
not a jerky, straight-lined linear interpolation.

This function adds the curves.

y1 is the start of the range
y2 is the end of the range
mu is a value between 0 and 1 representing
the current position in the interpolation sequence.
*/
const cosineInterpolate = (y1, y2, mu) => {
  const mu2 = (1 - Math.cos(mu * Math.PI)) / 2;
  return (y1 * (1 - mu2)) + (y2 * mu2);
};

const createPhase = ({ length, start, end }) => {
  return Array.from({ length }).map((v, i) => {
    const mu = i / length;
    return cosineInterpolate(start, end, mu);
  });
};

const memo = {};

const createActionPotential = ({
  ticksPerMs = 44.1,
  depolarizationMs = 1,
  repolarizationMs = 1,
  refractoryMs = 4,
  min = -0.1,              // roughly -70mV
  max = 1,                 // roughly 40mV
  restingPotential = 0     // roughly -60mV
} = {}) => {

  const key =
    ['t', ticksPerMs, 'd', depolarizationMs, 'r', repolarizationMs,
    'rf', refractoryMs, 'mn', min, 'mx', max].join('');

  if (memo[key]) return memo[key];

  const depolarization = createPhase({
    length: depolarizationMs * ticksPerMs,
    start: restingPotential,
    end: max
  });

  const repolarization = createPhase({
    length: repolarizationMs * ticksPerMs,
    start: max,
    end: min
  });

  const refractory = createPhase({
    length: refractoryMs * ticksPerMs,
    start: min,
    end: restingPotential
  });

  const ap = [...depolarization, ...repolarization, ...refractory,
    restingPotential];

  memo[key] = ap;

  return ap;
};

module.exports = module.exports.default = module.exports.createActionPotential =
  createActionPotential;
