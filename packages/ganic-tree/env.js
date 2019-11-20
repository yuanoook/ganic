const nullFn = () => null;

const getTagUtils = () => {
  return {
    organism: nullFn,
    onReady: nullFn,
  };
};

module.exports = {
  getTagUtils,

  updateLeaf: nullFn,
  vanishLeaf: nullFn,

  onSettled: nullFn,
  relocate: nullFn,
};
