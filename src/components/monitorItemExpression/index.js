import React, { Component } from 'react';
import Target from '@components/target';
import ConnectDropTarget from '@components/connectDropTarget';
import Arithmetic from '@components/arithmetic';
import Relation from '@components/relations';
import Logic from '@components/logic';
import Container from '@components/container';
import BaseExp from '@components/baseExp';
import { deviceTypeList } from '@components/datas/deviceTypeList';
import _ from 'lodash';
import { Card, Icon, Form, Select } from '@alife/aisc';

import {
  $generate,
  charToChinese,
  chineseToChar,
} from '@components/utils';

const babylon = require('babylon');

console.log('----deviceTypeList----', deviceTypeList);

const { Combobox } = Select;

// 获取下拉框的值，这里没有ajax请求，直接写死数据
const GLOBAL_ARRS = [];
deviceTypeList.forEach(item => {
  GLOBAL_ARRS.push({
    label: item.name,
    value: item.name,
    _value: item.code
  });
});
console.log('-----GLOBAL_ARRS----', GLOBAL_ARRS);

const DropTarget = function (props) {
  let P = ConnectDropTarget(Target, props.primaryKey)
  return <P {...props}>{props.children}</P>
};

// 关联项
const relationshipItemArrs = [
  {
    label: '默认',
    value: 1
  },
  {
    label: '设备类型',
    value: 2
  }
];

export default class MonitorItemExpression extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    defaultExpression: null,
  }
  emitChange = () => {
    const { expression } = this.state
    const { onChange = e => e } = this.props
    onChange(expression)
  }
  handleChange = (val, component, start, end, index, subIndex) => {
    console.log('---xxx----进来了');
    index = index || 0; // 父列表索引
    subIndex = subIndex || 0; // 子列表索引

    let { expressionItem, parentHandler, saveExpression } = this.props;
    let currentCode = '';
    let expressionSingleItem = null;
    if (expressionItem[index].data[subIndex] && expressionItem[index].data[subIndex].conditionDefinition) {
      expressionSingleItem = expressionItem[index].data[subIndex].conditionDefinition;
    } else {
      expressionSingleItem = expressionItem[index].data[subIndex];
    }
    let preCode = $generate(expressionSingleItem);
    
    if (typeof val === 'string') {
      currentCode = preCode.slice(0, start) + `TEXT$${val}` + preCode.slice(end, preCode.length);
    } else if (val.isLabel) {
      currentCode = preCode.slice(0, start) + `LABEL$${val.customName}$${val.customId}` + preCode.slice(end, preCode.length)
    } else {

      switch (val.type) {
        case 'arithExp':
        case 'relationExp':

          currentCode = expressionItem[index] && expressionItem[index].data[subIndex] && !component.props.empty ? val.value(false, true) : val.value(true, true)
          if (start || end) {
            currentCode = preCode.slice(0, start) + currentCode.slice(0, currentCode.length) + preCode.slice(end, preCode.length)
          } else {
            currentCode = preCode + currentCode
          }
          break
        case 'logicExp':
        case 'bracketsExp':
        case 'text':
          currentCode = val.value()
          if (start || end) {
            currentCode = preCode.slice(0, start) + currentCode.slice(0, currentCode.length) + preCode.slice(end, preCode.length)
          } else {
            currentCode = val.value()
          }
          break
      }
    }
    currentCode = charToChinese(currentCode);

    let t = babylon.parse(currentCode.replace(/\./g, 'Q'))
    t.tokens.map(o => {
      o.value = o.value ? chineseToChar(o.value) : null;
    })
    expressionItem[index].data[subIndex] = t;
    saveExpression[index].data[subIndex] = t;
    parentHandler(expressionItem, saveExpression);
  }
  handleClear = (index, subIndex) => {
   const { expressionItem, saveExpression, parentHandler } = this.props;
   if (expressionItem[index].data[subIndex] && expressionItem[index].data[subIndex].id) {
     saveExpression[index].data[subIndex].editClear = true;
     saveExpression[index].data[subIndex].deleted = (new Date()).getTime();
   }
   expressionItem[index].data[subIndex] = null;
   console.log('---expressionItem---', expressionItem);
   parentHandler(expressionItem, saveExpression);
  }
  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        expression: value
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (value) {
      this.setState({
        expression: value
      })
    }
  }
  /*
   * @param { rootIndex } 父节点的索引
   * @param { subIndex } 子节点的索引
  */
  removeSubItem(rootIndex, subIndex) {
    console.log('----rootIndex----', rootIndex);
    console.log('----subIndex----', subIndex);
    const { expressionItem, parentHandler, callbackItemDefinitions } = this.props;
    const cItem = expressionItem[rootIndex].data[subIndex];
    const callbackItem = callbackItemDefinitions && callbackItemDefinitions[rootIndex] ? callbackItemDefinitions[rootIndex][subIndex] : null;

    // console.log('----callbackItemDefinitions---', callbackItemDefinitions);

    if (cItem && cItem.id) {
      // 说明是删除修改页面本来有的项 只需要将id改为时间戳，并且增加一个标识 渲染的时候，通过该标示不重新渲染
      if (expressionItem[rootIndex].data[subIndex]) {
        expressionItem[rootIndex].data[subIndex].deleted = (new Date()).getTime();
        expressionItem[rootIndex].data[subIndex].isDeleted = true;
        delete expressionItem[rootIndex].data[subIndex].conditionDefinition;
      } else {
        expressionItem[rootIndex].data.splice(subIndex, 1);
      }
    } else {
      // 有这么一种逻辑，页面一进来有数据，当用户先清除掉，再删除掉数据操作，需要处理下
      if (callbackItem && callbackItem.id) {
        // 说明是删除修改页面本来有的项 只需要将id改为时间戳，并且增加一个标识 渲染的时候，通过该标示不重新渲染
        if (callbackItemDefinitions[rootIndex][subIndex]) {
          callbackItemDefinitions[rootIndex][subIndex].deleted = (new Date()).getTime();
          callbackItemDefinitions[rootIndex][subIndex].isDeleted = true;
          delete callbackItemDefinitions[rootIndex][subIndex].conditionDefinition;
          expressionItem[rootIndex].data.splice(subIndex, 1);
        }
      } else {
        expressionItem[rootIndex].data.splice(subIndex, 1);
      }
    }
    console.log('----最终返回的数据111---', expressionItem)
    console.log('----最终返回的数据222---', callbackItemDefinitions);
    if (callbackItemDefinitions && callbackItemDefinitions.length) {
      for (let c1 = 0, clen1 = callbackItemDefinitions.length; c1 < clen1; c1++) {
        const c1Items = callbackItemDefinitions[c1];
        if (c1Items && c1Items.length) {
          for (let c2 = 0, clen2 = c1Items.length; c2 < clen2; c2++) {
            if (c1Items[c2].isDeleted && !expressionItem[c1].data[c2]) {
              expressionItem[c1].data.push({
                deleted: c1Items[c2].deleted,
                id: c1Items[c2].id,
                isAlreadyRemove: true,
              });
            }
          }
        }
      }
    }
    let num = 0;
    if (expressionItem[rootIndex].data) {
      expressionItem[rootIndex].data.forEach(item => {
        if ((item && item.isDeleted) || (item && item.isAlreadyRemove)) {
          num = num + 1;
        }
      });
    }
    // 判断是否是最后一项数据, 给父级节点添加标识
    if (num === expressionItem[rootIndex].data.length) {
      expressionItem[rootIndex].isAllRemove = true;
    }
    if (expressionItem[rootIndex].data.length === 0) {
      // 把外层容器删除掉
      expressionItem.splice(rootIndex, 1);
    }
    // 调用父组件的方法，重新渲染页面
    parentHandler(expressionItem, expressionItem);
  }
  /*
   * @param { rootIndex } 父节点的索引
   * @param { subIndex } 子节点的索引
  */
  addItem(rootIndex, subIndex) {
    console.log('----rootIndex----', rootIndex);
    console.log('----subIndex----', subIndex);
    const { expressionItem, parentHandler } = this.props;
    const { defaultExpression } = this.state;
    expressionItem[rootIndex].data.push(defaultExpression);
    
    // 调用父组件的方法，重新渲染页面
    parentHandler(expressionItem, expressionItem);
  }
  /*
   * 向下移动
  */
  moveDown(rootIndex, subIndex) {
    console.log('---moveDown---');
    // 不管是向上移动还是向下移动，父容器是永远不会变的，只改变子节点的数据
    // 向下移动就是把当前的数据插入到数组中的下一个位置上
    const { expressionItem, parentHandler } = this.props;
    const index = subIndex + 1;
    const temp = expressionItem[rootIndex].data[index];
    expressionItem[rootIndex].data[index] = expressionItem[rootIndex].data[subIndex];
    expressionItem[rootIndex].data[subIndex] = temp;
    // 调用父组件的方法，重新渲染页面
    parentHandler(expressionItem, expressionItem);
  }
  /*
   * 向上移动
  */
  moveUp(rootIndex, subIndex) {
    console.log('---moveUp---');
    // 不管是向上移动还是向下移动，父容器是永远不会变的，只改变子节点的数据
    // 向上移动就是把当前的数据插入到数组中的上一个位置上
    const { expressionItem, parentHandler } = this.props;
    const index = subIndex - 1;
    const temp = expressionItem[rootIndex].data[index];
    expressionItem[rootIndex].data[index] = expressionItem[rootIndex].data[subIndex];
    expressionItem[rootIndex].data[subIndex] = temp;
    // 调用父组件的方法，重新渲染页面
    parentHandler(expressionItem, expressionItem);
  }
  // 关联项
  conditonType = (item, pIndex) => {
    console.log('----item-----', item);
    const { expressionItem, parentHandler } = this.props;
    expressionItem[pIndex].conditon_type = item.label;
    expressionItem[pIndex].conditon_type_value = item.value;
    if (Number(item.value) === 2) {
        expressionItem[pIndex].deviceTypeLists = GLOBAL_ARRS;
        // 调用父组件的方法，重新渲染页面
        parentHandler(expressionItem, expressionItem);
    } else {
      expressionItem[pIndex].deviceTypeLists = [];
      expressionItem[pIndex].conditon_deviceName = '';
      expressionItem[pIndex].conditon_deviceName_value = '';
      // 调用父组件的方法，重新渲染页面
      parentHandler(expressionItem, expressionItem);
    }
  }
  // 关联项的值
  conditonValue = (items, pIndex) => {
    console.log('-----关联项的值----');
    const { expressionItem, parentHandler } = this.props;
    let label = '';
    let value = '';
    if (items && items.length) {
      items.forEach(item => {
        if (item && (item !== "")) {
          label += ',' + item.label;
          value += ',' + item._value;
        }
      });
    }
    label = label.substr(1);
    value = value.substr(1);
    expressionItem[pIndex].conditon_deviceName = label;
    expressionItem[pIndex].conditon_deviceName_value = value;
    // 调用父组件的方法，重新渲染页面
    parentHandler(expressionItem, expressionItem);
  }
  /*
   * 从 baseExp 中调用的回调函数
  */
  onHandler = (expressionItem) => {
    this.props.parentHandler(expressionItem, expressionItem);
  }
  render() {
    const { expressionItem } = this.props;
    console.log('----渲染数据-22333---expressionItem---', expressionItem);

    return <div className="expression-div">
      {
        expressionItem.map((pItem, pIndex) => {
          const isAllRemove = pItem.isAllRemove;
          return (
            <div className="monitor-subItem" style={{ display: isAllRemove ? "none" : "block" }}>
              <div className="expression-left">
                <Form>
                  <Form.Item>
                    <Select placeholder="请选择关联项"
                      style={{ width: 160 }}
                      dataSource={relationshipItemArrs}
                      value={pItem.conditon_type_value}
                      onChange={ (value, item) => {
                        this.conditonType(item, pIndex);
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Combobox
                      placeholder="请选择"
                      style={{ width: 160 }}
                      dataSource={ pItem.deviceTypeLists }
                      value={ pItem.conditon_deviceName && pItem.conditon_deviceName.split(',') }
                      multiple
                      onChange = { (value, item) => {
                        this.conditonValue(item, pIndex);
                      }}
                    />
                  </Form.Item>
                </Form>
              </div>
              <div className="expression-right">
                {
                  pItem && pItem.data && pItem.data.map((item, index) => {
                    let curItem = item;
                    if (item) {
                      if (item.conditionDefinition || item.definition) {
                        curItem = item.definition || item.conditionDefinition;
                      }
                    }
                    const isShow = !curItem || (curItem && !curItem.isDeleted && !curItem.isAlreadyRemove);
                    return (
                      <div className="r-container" style={{ display: isShow ? 'block' : 'none' }}>
                        <DropTarget primaryKey={['root']}> 
                          <Container onClear={() => {
                            this.handleClear(pIndex, index);
                          }} className="next-input next-input-multiple drop-container" hasClear value={<BaseExp value={curItem} onChange={this.handleChange} index={pIndex} subIndex={index} expressionItem={expressionItem} onHandler={this.onHandler} />}
                            style={{ marginRight: '20px', display: 'block', width: 'auto' }} placeholder="请从左侧引用测点，下方拖动表达式进行编辑" onChange={this.handleChange} index={pIndex} subIndex={index} expressionItem={expressionItem} onHandler={this.onHandler} />
                        </DropTarget>
                        <Icon type="ashbin-o" size="small" onClick={() => {
                          this.removeSubItem(pIndex, index)
                        }}></Icon>
                        {
                          index === 0 && (index === pItem.data.length - 1) ? '' : (index === 0 ? <Icon type="shebeishangxian" size="small" onClick={() => {
                            this.moveDown(pIndex, index)
                          }} /> : (index === pItem.data.length - 1 ? <Icon type="shebeixiaxian" size="small" onClick={() => {
                            this.moveUp(pIndex, index)
                          }} /> : <span><Icon type="shebeixiaxian" size="small" onClick={() => {
                            this.moveUp(pIndex, index)
                          }} /><Icon type="shebeishangxian extra-direction" size="small" onClick={() => {
                            this.moveDown(pIndex, index)
                          }} /></span>))
                        }
                        {
                          index === pItem.data.length - 1 ? <Icon type="add-circular" className={index === 0 && (index === pItem.data.length - 1) ? 'add-circular2' : ''} size="small" onClick={() => {
                            this.addItem(pIndex, index)
                          }} /> : ''
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
      <div style={{ marginTop: 4 }} className="flex symbols">
        {/* 算数表达式 */}
        <Arithmetic />
        <Relation />
        <Logic />
      </div>
    </div>
  }
}
