const {
  useRectRef,
  useViewport,
} = require('ganic-pandora');

const { AIR_TAG } = require('./airTags');

const useInvisible = rect => {
  const viewport = useViewport();
  return !rect
    || rect.bottom <= 0
    || rect.right <= 0
    || rect.top >= viewport.height
    || rect.left >= viewport.width;
};

const getStyleInfo = (rect, dom) => {
  const style = window.getComputedStyle(dom);
  const minHeight = (rect.height
      - style.borderTopWidth.replace(/px/, '')
      - style.borderBottomWidth.replace(/px/, '')
      - style.paddingTop.replace(/px/, '')
      - style.paddingBottom.replace(/px/, '')
    );
  const minWidth = (rect.width
      - style.borderLeftWidth.replace(/px/, '')
      - style.borderRightWidth.replace(/px/, '')
      - style.paddingLeft.replace(/px/, '')
      - style.paddingRight.replace(/px/, '')
    );
  const display = style.display;
  return {display, minHeight, minWidth};
};

const getPlaceHolder = (invisible, rect, domRef) => {
  let minHeight = '1em';
  let minWidth = '1em';
  let display = 'block';
  let placeHolder = {
    organism: AIR_TAG,
    props: {},
  };

  if (invisible && rect && domRef.current) {
    const styleInfo = getStyleInfo(rect, domRef.current);
    minWidth = styleInfo.minWidth ? (styleInfo.minWidth + 'px') : minWidth;
    minHeight = styleInfo.minHeight ? (styleInfo.minHeight + 'px') : minHeight;
    display = styleInfo.display;
  }

  if (display === 'table-row-group') {
    placeHolder.props = {
      style: {display, minWidth},
      children: [{
        organism: AIR_TAG,
        props: {
          style: {display: 'block', minHeight},
        },
      }],
    };
  } else {
    placeHolder.props.style = {
      display: display,
      minHeight: minHeight,
      minWidth: minWidth,
    };
  }

  return placeHolder;
};

const useAir = (attrs = {}) => {
  const {ref: originalRef} = attrs;

  const [rect, domRef] = useRectRef();
  const invisible = useInvisible(rect);

  const placeHolder = getPlaceHolder(invisible, rect, domRef);
  const ref = dom => {
    domRef(dom);
    if (originalRef) {
      originalRef(dom);
    }
  };

  return {
    domRef,
    invisible,
    placeHolder,
    attrs: {ref, ...attrs},
  };
};

module.exports = useAir;
