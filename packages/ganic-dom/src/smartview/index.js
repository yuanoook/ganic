const useSmartView = require('./useSmartView');
const { smartTags } = require('./utils');

const smartView = (tagName, _attachTag) => props => {
  const {children, ...attrs} = props || {};
  const {domRef, invisible, placeHolder, style, ref} = useSmartView(attrs);

  _attachTag(tagName, {...attrs, style, ref});

  // shortcut if invisible situation does not change
  if (invisible && domRef.invisible && domRef.children) {
    return domRef.children;
  }

  domRef.children = invisible ? placeHolder : children;
  domRef.invisible = invisible;
  return domRef.children;
};

module.exports = {
  smartTags,
  smartView
}
