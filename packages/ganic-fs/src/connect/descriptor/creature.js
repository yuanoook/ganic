const __descriptor = Symbol();

function getDescriptor({organ, fullName, creature}) {
  if (!organ[__descriptor]) {
    const extra = { fullName };
    organ[__descriptor] = new Proxy(creature, {
      get: function(_, property) {
        return extra.hasOwnProperty(property)
          ? extra[property]
          : creature[property];
      },
    });
  }
  return organ[__descriptor];
}

module.exports = getDescriptor;
