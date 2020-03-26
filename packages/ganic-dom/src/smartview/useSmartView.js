const { useState, useRef } = require('ganic-usex');
const useGlobalInterval = require('./useGlobalInterval');
const useViewport = require('./useViewport');
const { getRefRect } = require('./utils');

const useRect = domRef => {
  const [rect, setRect] = useState(() => getRefRect(domRef));
  useGlobalInterval(() => setRect(getRefRect(domRef)), 100);
  return rect;
};

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
      - +style.borderTopWidth.replace(/px/, '')
      + +style.borderBottomWidth.replace(/px/, '')
      - +style.paddingTop.replace(/px/, '')
      + +style.paddingBottom.replace(/px/, '')
    ) + 'px';
  const minWidth = (rect.width
      - +style.borderLeftWidth.replace(/px/, '')
      + +style.borderRightWidth.replace(/px/, '')
      - +style.paddingLeft.replace(/px/, '')
      + +style.paddingRight.replace(/px/, '')
    ) + 'px';
  const display = style.display;
  return {display, minHeight, minWidth};
};

const getPlaceHolder = (invisible, rect, domRef) => {
  let minHeight = '1em';
  let minWidth = '1em';
  let display = 'block';
  let placeHolder = {
    organism: 'smart-view',
    props: {},
  };

  if (invisible && rect && domRef.current) {
    const styleInfo = getStyleInfo(rect, domRef.current);
    minWidth = styleInfo.minWidth;
    minHeight = styleInfo.minHeight;
    display = styleInfo.display;
  }

  if (display === 'table-row-group') {
    placeHolder.props = {
      style: {display, minWidth},
      children: [{
        organism: 'smart-view',
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

const getStyle = (invisible, style) => {
  const visibility = invisible
    ? 'hidden'
    : (style && style.visibility ? style.visibility : 'visible');
  return {...style, visibility};
};

const useSmartView = (attrs) => {
  const {style: originalStyle, ref: originalRef} = attrs || {};

  const domRef = useRef();
  const rect = useRect(domRef);
  const invisible = useInvisible(rect);

  const placeHolder = getPlaceHolder(invisible, rect, domRef);
  const style = getStyle(invisible, originalStyle);
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
    style,
    ref,
  };
};

module.exports = useSmartView;
