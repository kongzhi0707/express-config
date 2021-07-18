import { DragSource } from 'react-dnd'

const source = {
  beginDrag(props, monitor, component) {
    if (!component) {
      return;
    }
    const html = component.props && component.props.html;
    const value = component.props && component.props.value;
    return {
      ...props,
      html,
      value,
    }
  }
}

export default (Component, type) => DragSource(type || 'aisc', source, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})(Component)