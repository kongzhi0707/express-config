import React, { Component } from 'react';
import { Card, Button } from '@alife/aisc';
import Source from '@components/dragSource';
import ConnectDragSource from '@components/connectDragSource';

const dragSource = canDropIn => ConnectDragSource(Source, canDropIn)
const DragSource = dragSource('root');

export const relationExp = symbol => {
  return {
    value: (left, right) => {
      return `${left ? `R$x` : ''}${symbol}${right ? `R$x` : ''}`
    },
    type: 'relationExp'
  }
}

export default class Relation extends Component {
  render() {
    return <Card title="关系表达式">
      <DragSource value={relationExp('==')}>
        <Button size="small" type="primary"><span>{"=="}</span></Button>
      </DragSource>
      <DragSource value={relationExp('!=')}>
        <Button size="small" type="primary"><span>{"!="}</span></Button>
      </DragSource>
      <DragSource value={relationExp('>=')}>
        <Button size="small" type="primary"><span>{">="}</span></Button>
      </DragSource>
      <DragSource value={relationExp('<=')}>
        <Button size="small" type="primary"><span>{"<="}</span></Button>
      </DragSource>
      <DragSource value={relationExp('>')}>
        <Button size="small" type="primary"><span>{">"}</span></Button>
      </DragSource>
      <DragSource value={relationExp('<')}>
        <Button size="small" type="primary"><span>{"<"}</span></Button>
      </DragSource>
      <DragSource value={relationExp('&&')}>
        <Button size="small" type="primary"><span>{"&&"}</span></Button>
      </DragSource>
      <DragSource value={relationExp('||')}>
        <Button size="small" type="primary"><span>{"||"}</span></Button>
      </DragSource>
    </Card>
  }
}