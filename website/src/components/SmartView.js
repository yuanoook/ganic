/* eslint-disable no-unused-vars */
import Ganic from 'ganic';
import { useState, useRef } from "ganic-usex";
import useGlobalInterval from '../shared/useGlobalInterval';
import useViewport from '../shared/useViewport';
import { getRefRect } from '../shared/utils'

const useRect = domRef => {
  const [rect, setRect] = useState(() => getRefRect(domRef))
  useGlobalInterval(() => setRect(getRefRect(domRef)), 100)
  return rect
}

const SmartView = ({ children }) => {
  const domRef = useRef()
  const viewport = useViewport()
  const rect = useRect(domRef)
  const invisible = !rect
    || rect.bottom <= 0
    || rect.right <= 0
    || rect.top >= viewport.height
    || rect.left >= viewport.width

  // shortcut if invisible situation does not change
  if (invisible && domRef.invisible && domRef.children) {
    return domRef.children
  }

  const child = children[0]
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
  const visibility = invisible
    ? 'hidden'
    : (child.props.style && child.props.style.visibility
        ? child.props.style.visibility
        : 'visible')

  const grandChildren = invisible
    ? placeHolder
    : child.props.children

  domRef.invisible = invisible
  domRef.children = {
    ...child,
    props: {
      ...child.props,
      children: grandChildren,
      style: {
        ...child.props.style,
        visibility
      },
      ref: dom => {
        domRef(dom)
        child.props.ref && child.props.ref(dom)
      }
    }
  }

  return domRef.children
}

export default SmartView
