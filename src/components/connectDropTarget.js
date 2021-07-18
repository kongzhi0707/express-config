import React from 'react';
import {
  DropTarget,s
} from 'react-dnd';

const boxTarget = {
  drop: (props, monitor, component) => {
    if (!component) {
      return
    }
    let children = props.children;
    if (Array.isArray(children)) {
      throw 'You should pass a single node for the chidlren'
    }
    if (props.exchange) {
      let hoverIndex = props.index
      let targetIndex = monitor.getItem().index
      if (hoverIndex !== targetIndex) {
        let onChange = children.props.onChange
        onChange(hoverIndex, targetIndex, component)
      }
      return
    }
    if (!component.props.isOverCurrent) return
    let onChange = children.props.onChange;
    const index = children.props.index || 0;
    const subIndex = children.props.subIndex || 0;
    onChange ? onChange(monitor.getItem().value, component, undefined, undefined, index, subIndex) : null
  },
  hover: (props, monitor, component) => {
    if (!component) {
      return null
    }
    window.isChildOver = false
    if (component.props.isOver && component.props.isChild) {
      window.isChildOver = true
    }
    if (props.hover) props.hover(props, monitor, component)
  },
  canDrop: (props, monitor) => {
    let { allow } = props
    if (!allow) return true
    let component = monitor.getItem()
    if (allow(component)) {
      return true
    } else {
      return false
    }
  }
}

export default (Component, type) => DropTarget(type || 'aisc', boxTarget, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  }
})(Component);