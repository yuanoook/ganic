const floor = (num, unit = 1) => Math.floor(num - num % unit);
const getRefRect = (domRef, unit = 1) => {
  if (
    !domRef.current
    || !domRef.current.parentElement
    || !domRef.current.getBoundingClientRect
  ) {
    return;
  }

  const {
    width = 0,
    height = 0,
    top = 0,
    right = 0,
    bottom = 0,
    left = 0,
  } = domRef.current.getBoundingClientRect();

  return {
    width: floor(width, unit),
    height: floor(height, unit),
    top: floor(top, unit),
    right: floor(right, unit),
    bottom: floor(bottom, unit),
    left: floor(left, unit),
  };
};

const smartTags = {
  sv: false,
  'smart-view': false,
  div: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  p: true,

  ol: true,
  ul: true,

  form: true,

  table: true,
  tbody: true,

  main: true,
  section: true,
  nav: true,
  header: true,
  footer: true,
  article: true,
  aside: true,

  pre: true,
  details: true,
  summary: true,
  address: true,
  blockquote: true,
  dl: true,
  fieldset: true,
  noscript: true,
};

module.exports = {
  floor,
  getRefRect,
  smartTags,
};
