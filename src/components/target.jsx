import React, { PureComponent } from 'react';

const Clone = function (obj, options) {
  if (obj !== void (0) && obj.$$typeof === Symbol.for('react.element')) {
    return React.cloneElement(obj,
      { ...options }
    )
  }
  return obj;
};

export default class Target extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      canDrop, isOver, connectDropTarget, children,
      className = '', onChange = e => e
    } = this.props;
    const border = canDrop && isOver ? '1px solid #2e85ff' : ''
    const transition = '0.3s border';
    console.log('----children----', children);
    return connectDropTarget(<span className={`${canDrop && isOver ? 'hover ' : ''}${className}`}>
      {
        Clone(children, {
          style: { border, transition, ...children.props.style }
        })
      }
    </span>)
  }
}