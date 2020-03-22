const stackFactory = key => {
  const stack = [];
  const set = item => stack.push(item);
  const get = () => stack[stack.length - 1] || null;
  const getAll = () => [...stack];
  const clear = item => {
    const index = stack.lastIndexOf(item);
    if (index === -1) {
      throw new Error(`Lakhesis.clear${key} gets wrongly called!`);
    }
    if (index !== stack.length - 1) {
      throw new Error(`Don\'t support error boundary now!`);
    }
    stack.splice(index);
  };
  return [set, get, clear, getAll];
};

const [
  setUpdatingOrgan,
  getUpdatingOrgan,
  clearUpdatingOrgan,
  getAllUpdatingOrgans,
] = stackFactory('UpdatingOrgan');

const [
  setGivingParasite,
  getGivingParasite,
  clearGivingParasite,
  getAllGivingParasites,
] = stackFactory('GivingParasite');

module.exports = {
  setUpdatingOrgan,
  getUpdatingOrgan,
  clearUpdatingOrgan,
  getAllUpdatingOrgans,

  setGivingParasite,
  getGivingParasite,
  clearGivingParasite,
  getAllGivingParasites,
};
