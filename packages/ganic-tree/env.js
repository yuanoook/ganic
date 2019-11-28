const nullFn = () => null;

const getTagkit = () => {
  return {
    organism: nullFn,
    onReady: nullFn,
  };
};

module.exports = {
  getTagkit,

  updateLeaf: nullFn,
  vanishLeaf: nullFn,

  onSettled: nullFn,
  relocate: nullFn,
  onBuried: nullFn,
};
