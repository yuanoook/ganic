const broswerInfo = {
  isMobile: /mobile/i.test(navigator.userAgent),
  isIE: /MSIE/i.test(navigator.userAgent) || /Trident/i.test(navigator.userAgent),
};

module.exports = () => broswerInfo;
