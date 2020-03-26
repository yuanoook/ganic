/* eslint-disable no-unused-vars */
import useSmartView from '../shared/useSmartView';

const SmartView = ({ children }) => {
  const child = children[0]
  const {domRef, invisible, placeHolder, style, ref} = useSmartView(child.props);

  // shortcut if invisible situation does not change
  if (invisible && domRef.invisible && domRef.children) {
    return domRef.children
  }

  const grandChildren = invisible ? placeHolder : child.props.children
  const props = {...child.props, style, ref, children: grandChildren}

  domRef.invisible = invisible
  domRef.children = {...child, props}

  return domRef.children
}

export default SmartView
