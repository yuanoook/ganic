
const Fragment = null;

const createElement = (element, attrs, ...children) =>
  element === Fragment
    ? children
    : {
      organism: element,
      props: children.length ? {...attrs, children} : attrs,
    };

module.exports = {
  Fragment,
  createElement,
};
