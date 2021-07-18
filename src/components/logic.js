import React, { Component } from 'react'
import { Card, Button } from '@alife/aisc';
import Source from '@components/dragSource';
import ConnectDragSource from '@components/connectDragSource';

const dragSource = canDropIn => ConnectDragSource(Source, canDropIn)
const RegDragSource = dragSource('root')

export const regularExp = symbol => {
  return {
    value: () => `${symbol}(L$${symbol})`,
    type: 'logicExp'
  }
}

export default class Logic extends Component {
  render() {
    return <Card title="逻辑表达式">
      <RegDragSource value={regularExp('sum')}>
        <Button size="small" type="primary"><span>sum</span></Button>
      </RegDragSource>
      <RegDragSource value={regularExp('avg')}>
        <Button size="small" type="primary"><span>avg</span></Button>
      </RegDragSource>
      <RegDragSource value={regularExp('max')}>
        <Button size="small" type="primary"><span>max</span></Button>
      </RegDragSource>
      <RegDragSource value={regularExp('min')}>
        <Button size="small" type="primary"><span>min</span></Button>
      </RegDragSource>
      <RegDragSource value={regularExp('count')}>
        <Button size="small" type="primary"><span>count</span></Button>
      </RegDragSource>
    </Card>
  }
}
