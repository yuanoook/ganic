'use strict';

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

module.exports = {
  setUpdatingOrgan,
  clearUpdatingOrgan,

  getUpdatingOrgan,

  givingParasite: null,
};
