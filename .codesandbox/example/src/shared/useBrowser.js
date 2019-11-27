const broswerInfo = {
  isMobile: /mobile/i.test(navigator.userAgent)
};

module.exports = () => broswerInfo;
