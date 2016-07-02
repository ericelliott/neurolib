const createNode = require('./create-node');

const nodeFromArray = ({
  clock,
  array
}) => {
  let index = 0;

  const node = createNode(clock);

  return node.map(() => {
    const value = array[index];
    if (index > array.length - 1) node.complete();
    index += 1;
    return value;
  });
};

module.exports = module.exports.default = module.exports.nodeFromArray =
  nodeFromArray;
