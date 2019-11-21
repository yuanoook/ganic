const updatingOrgans = [];
const setUpdatingOrgan = organ => updatingOrgans.push(organ);
const clearUpdatingOrgan = organ => {
  const index = updatingOrgans.indexOf(organ);
  if (index === -1) {
    throw new Error('Lakhesis.clearUpdatingOrgan gets wrongly called!');
  }
  if (index !== updatingOrgans.length - 1) {
    throw new Error('Don\'t support error boundary now!');
  }
  updatingOrgans.splice(updatingOrgans.indexOf(organ));
};
const getUpdatingOrgan = () => updatingOrgans[updatingOrgans.length - 1];

const attach = function(parasitism, deps, firstValue) {
  const updatingOrgan = getUpdatingOrgan();
  if (!updatingOrgan) {
    throw new Error("Don't use ATTACH outside of organism!");
  }
  return updatingOrgan.attach(parasitism, deps, firstValue);
};

let givingParasite;
const setGivingParasite = parasite => {
  givingParasite = parasite;
};
const getGivingParasite = () => givingParasite;
const clearGivingParasite = () => setGivingParasite(null);

module.exports = {
  attach,

  setUpdatingOrgan,
  getUpdatingOrgan,
  clearUpdatingOrgan,

  setGivingParasite,
  getGivingParasite,
  clearGivingParasite,
};
