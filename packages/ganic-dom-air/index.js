const useAir = require('./src/useAir');
const airTags = require('./src/airTags');

const airView = (tagName, attachTag) => props => {
  const { children, ...attrs } = props || {};
  const { domRef, invisible, placeHolder, attrs: newAttrs } = useAir(attrs);
  attachTag(tagName, newAttrs);

  // shortcut if placeHolder higher than window, because this shit will crap
  const placeHolderHigh = placeHolder.props.style.minHeight.replace(/\D/g, '') || 0;
  const higherThanWindow = window.innerHeight - placeHolderHigh <= 0;
  if (higherThanWindow) {
    return children;
  }

  // shortcut if invisible situation does not change
  if (invisible && domRef.invisible && domRef.children) {
    return domRef.children;
  }

  domRef.children = invisible ? placeHolder : children;
  domRef.invisible = invisible;
  return domRef.children;
};

const makeOrganism = (tagName, attachTag) =>
  airTags[tagName] && airView(tagName, attachTag);

module.exports = {
  makeOrganism,
};
