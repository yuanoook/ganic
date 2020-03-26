/* eslint-disable no-unused-vars */
import Ganic from 'ganic';
import { useState, useRef } from 'ganic-usex';
import useGlobalInterval from './useGlobalInterval';
import useViewport from './useViewport';
import { getRefRect } from './utils';

const useRect = domRef => {
  const [rect, setRect] = useState(() => getRefRect(domRef))
  useGlobalInterval(() => setRect(getRefRect(domRef)), 100)
  return rect
}

const useInvisible = rect => {
  const viewport = useViewport()
  return !rect
    || rect.bottom <= 0
    || rect.right <= 0
    || rect.top >= viewport.height
    || rect.left >= viewport.width
}

const getPlaceHolder = (invisible, rect, domRef) => {
  let minHeight = '1em'
  let minWidth = '1em'
  let display = 'block'
  let placeHolder = <div style={{display, minHeight, minWidth}}/>

  if (invisible && rect && domRef.current) {
    const style = window.getComputedStyle(domRef.current)
    minHeight = (rect.height
      - +style.borderTopWidth.replace(/px/, '')
      + +style.borderBottomWidth.replace(/px/, '')
      - +style.paddingTop.replace(/px/, '')
      + +style.paddingBottom.replace(/px/, '')
    ) + 'px'
    minWidth = (rect.width
      - +style.borderLeftWidth.replace(/px/, '')
      + +style.borderRightWidth.replace(/px/, '')
      - +style.paddingLeft.replace(/px/, '')
      + +style.paddingRight.replace(/px/, '')
    ) + 'px'
    display = style.display
    if (display === 'table-row-group') {
      placeHolder = <div style={{display, minWidth}}><div style={{minHeight}}/></div>
    }
  }
  return placeHolder
}

const getStyle = (invisible, style) => {
  const visibility = invisible
    ? 'hidden'
    : (style && style.visibility ? style.visibility : 'visible')
  return {...style, visibility}
}

const useSmartView = (attrs) => {
  const {style: originalStyle, ref: originalRef} = attrs || {};

  const domRef = useRef()
  const rect = useRect(domRef)
  const invisible = useInvisible(rect)

  const placeHolder = getPlaceHolder(invisible, rect, domRef)
  const style = getStyle(invisible, originalStyle)
  const ref = dom => {
    domRef(dom)
    originalRef && originalRef(dom)
  }

  return {
    domRef,
    invisible,
    placeHolder,
    style,
    ref,
  }
}

export default useSmartView
