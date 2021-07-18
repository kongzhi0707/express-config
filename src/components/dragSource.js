import React, { Component } from 'react'

export default class Source extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { isDragging, connectDragSource, children } = this.props;
    const opacity = isDragging ? 0.25 : 1;
    return connectDragSource(<span style={{ opacity, cursor: 'move', display: 'inline-block' }}>{children}</span>)
  }
}