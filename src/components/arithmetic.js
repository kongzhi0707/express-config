import React, { Component } from 'react';
import { Card, Button } from '@alife/aisc';
import Source from '@components/dragSource';
import ConnectDragSource from '@components/connectDragSource';

const dragSource = canDropIn => ConnectDragSource(Source, canDropIn);
const DragSource = dragSource('root');
const BlankDragSource = dragSource('blank');
const TextDragSource = dragSource('text');

export const regularExp = symbol => {
  return {
    value: (left, right) => {
      return `${left ? `R$x` : ''}${symbol}${right ? `R$x` : ''}`
    },
    type: 'arithExp'
  }
}

export const bracketsExp = () => {
  return {
    value: () => `(BLANK$)`,
    type: 'bracketsExp'
  }
}

export const textExp = () => {
  return {
    value: () => `TEXT$`,
    type: 'text'
  }
}

export default class Arithmetric extends Component {
  render() {
    return <Card title={"算术表达式"}>
      <DragSource value={regularExp('+')}>
        <Button size="small" type="primary">+</Button>
      </DragSource>
      <DragSource value={regularExp('-')}>
        <Button size="small" type="primary">-</Button>
      </DragSource>
      <DragSource value={regularExp('*')}>
        <Button size="small" type="primary">*</Button>
      </DragSource>
      <DragSource value={regularExp('/')}>
        <Button size="small" type="primary">/</Button>
      </DragSource>
      <BlankDragSource value={bracketsExp()}>
        <Button size="small" type="primary"><span>()</span></Button>
      </BlankDragSource>
      <TextDragSource value={textExp()}>
        <Button size="small" type="primary"><span>number</span></Button>
      </TextDragSource>
    </Card>
  }
}