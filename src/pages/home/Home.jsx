import React, { Component } from 'react';
import { Button, Feedback } from '@alife/aisc';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DeviceTypeNodes from '@components/deviceTypeNodes';
import MonitorItemExpression from '@components/monitorItemExpression';
import _ from 'lodash';
import { customMetricItems } from '@components/datas/customMetricItems';
import Parse from '@components/parse';

import {
  getUrlParams,
  replaceDefinition,
  ast2Str,
  validatorFunc,
} from '@components/utils';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: [
        {
          data: [null],
          conditon_type: '',
          conditon_type_value: '',
          conditon_deviceName: '',
          conditon_deviceName_value: '',
        }
      ],
      defaultExpression: null,
      saveExpression: [
        {
          data: [null],
          conditon_type: '',
          conditon_type_value: '',
          conditon_deviceName: '',
          conditon_deviceName_value: '',
        }
      ], // 保存提交数据的表达式
      callbackItemDefinitions: [], // 保存后台返回的数据
    }
  }
  componentDidMount() {
    const id = getUrlParams('id');
    if (id) {
      /*
       * 后端返回如下数据
       const metricLibraryItemDefinitions = [
         [
           {
            "deleted": 0,
            "conditonType": 2,
            "conditonValue": "2,1,3,4",
            "definitionOrder": 0,
            "definition": "(sum([60002_1002])+avg([60002_1003]))&&(max([60002_1004])-min([60002_1005]))*(sum([60002_1002]))/(avg([60002_1003]))==count([60002_1004])"
            id: 1
           },
           {
            "deleted": 0,
            "conditonType": 2,
            "conditonValue": "2,1,3,4",
            "definitionOrder": 1,
            "definition": "((min([60002_1002])+count([60002_1003]))>=(avg([60002_1004])-max([60002_1005])))||(sum([60002_1002])*avg([60002_1003]))!=max([60002_1004])"
             id: 2
           }
         ],
         [
           {
             "deleted": 0,
             "conditonType": 2,
             "conditonValue": "1,2",
             "definitionOrder": 2,
             "definition": "(sum([60002_1002])+max([60002_1003]))<=(avg([60002_1004])-sum([60002_1005]))==count([1122333])"
             id: 3
           }
         ]
       ];
      */
     const metricLibraryItemDefinitions = [
        [
          {
            "deleted": 0,
            "conditonType": 2,
            "conditonValue": "2,1,3,4",
            "definitionOrder": 0,
            "conditonValueName": '测试2, 测试1, 测试3, 测试4',
            "definition": "(sum([60002_1002])+avg([60002_1003]))&&(max([60002_1004])-min([60002_1005]))*(sum([60002_1002]))/(avg([60002_1003]))==count([60002_1004])",
            id: 1
          },
          {
            "deleted": 0,
            "conditonType": 2,
            "conditonValue": "2,1,3,4",
            "definitionOrder": 1,
            "conditonValueName": '测试2, 测试1, 测试3, 测试4',
            "definition": "((min([60002_1002])+count([60002_1003]))>=(avg([60002_1004])-max([60002_1005])))||(sum([60002_1002])*avg([60002_1003]))!=max([60002_1004])",
            id: 2
          }
        ],
        [
          {
            "deleted": 0,
            "conditonType": 2,
            "conditonValue": "1,2",
            "conditonValueName": '测试1,测试2',
            "definitionOrder": 2,
            "definition": "(sum([60002_1002])+max([60002_1003]))<=(avg([60002_1004])-sum([60002_1005]))==count([1122333])",
            id: 3
          }
        ]
      ];
      if (metricLibraryItemDefinitions && metricLibraryItemDefinitions.length) {
        const arrs = [];
        Parse(metricLibraryItemDefinitions, customMetricItems).then(res => {
          const { definitions } = res;
          definitions && definitions.length && definitions.forEach(item => {
            arrs.push({
              data: item,
              conditon_type_value: item[0].conditonType,
              conditon_deviceName_value: item[0].conditonValue,
              conditon_deviceName: item[0].conditonValueName
            });
          });
          this.setState({
            expression: arrs,
            saveExpression: _.cloneDeep(arrs),
            defaultExpression: null,
            callbackItemDefinitions: _.cloneDeep(metricLibraryItemDefinitions),
          });
        });
      }
    }
  }
  // 新增或操作
  handleAddMonitor = () => {
    console.log('----向上或向下----', this.state);
    const { defaultExpression } = this.state;
    this.state.expression.push({
      data: [_.cloneDeep(defaultExpression)],
      conditon_type: '',
      conditon_type_value: '',
      conditon_deviceName: '',
      conditon_deviceName_value: '',
    });
    this.state.saveExpression.push({
      data: [_.cloneDeep(defaultExpression)],
      conditon_type: '',
      conditon_type_value: '',
      conditon_deviceName: '',
      conditon_deviceName_value: ''
    });
    
    this.setState({
      expression: this.state.expression,
      saveExpression: this.state.saveExpression,
    });
  }
  // 子组件调用父组件的方法
  parentHandler = (expression, saveExpression) => {
    this.setState({
      expression: _.cloneDeep(expression),
      saveExpression: _.cloneDeep(saveExpression)
    });
  }
  retExpressionFunc = () => {
    const { saveExpression } = this.state;
    const metricLibraryItemDefinitions = [];
    /*
     * 后端开发需要如下表达式的值
     * const metricLibraryItemDefinitions = [
     *   {
     *     id: '', // 新增时为null
     *     gmt_create: '', // 创建时间
     *     gmt_modified: '', // 修改时间
     *     definition: '', // 指标库计算表达式
     *     deleted: '', // 是否是删除，如果新增页面传递 0，如果是修改页面，开发返回原有的数据，就传递时间戳
     *     conditon_type: '', // 设备类型，默认是：1， 设备类型为：2
     *     conditon_value: '', // 判断值，如果为默认的话，值为空，否则的话，多个值使用逗号隔开。
     *     definition_order: '', 表达式优先级顺序，0 是最高，以此类推。。。。
     *   }
     * ];
    */
     if (saveExpression && saveExpression.length) {
       let num = -1;
       for (let j = 0, jlen = saveExpression.length; j < jlen; j++) {
         const { data } = saveExpression[j];
         if (data && data.length) {
           for (let k = 0, klen = data.length; k < klen; k++) {
              if (data[k] && !data[k].isAlreadyRemove) {
                num++;
                metricLibraryItemDefinitions.push({
                  id: data[k] && data[k].id || null,
                  deleted: data[k] && data[k].deleted || 0,
                  conditonType: saveExpression[j] && saveExpression[j].conditon_type_value,
                  conditonValue: saveExpression[j] && saveExpression[j].conditon_deviceName_value,
                  definitionOrder: num,
                  definition: data[k] && !data[k].deleted ? data[k] && replaceDefinition(ast2Str(data[k])) : (data[k] && data[k].conditionDefinition || ''),
                });
              }
           }
         }
       }
     }
     return metricLibraryItemDefinitions;
  }
  handleSubmit = () => {
    console.log('----handleSubmit---');
    console.log(this.state);
    const { callbackItemDefinitions } = this.state;
    let expressObj = this.retExpressionFunc();

    if (expressObj && expressObj.length < 1) {
      Feedback.toast.show({
        type: 'error',
        content: '表达式必须填写一项'
      })
      return;
    }
    const flag = validatorFunc(expressObj);
    if (!flag) {
      return;
    }
    const callbackItems = callbackItemDefinitions && callbackItemDefinitions.length && callbackItemDefinitions.reduce((a, b) => {
      return a.concat(b);
    });
    // 遍历数组，看新提交的数据 和 返回接口的数据是否相同，不相同说明该数据已经被删除了，需要传给开发
    let newArrs = [];
    expressObj.forEach(item => {
      newArrs.push(item.id);
    });
    for (let y = 0; y < callbackItems.length; y++) {
      const yId = callbackItems[y].id;
      if (newArrs.indexOf(yId) === -1) {
        expressObj.push({
          id: yId,
          deleted: (new Date()).getTime(),
          isAlreadyRemove: true,
          conditonType: callbackItems[y].conditonType,
          conditonValue: callbackItems[y].conditonValue,
          definition: callbackItems[y].definition,
          definitionOrder: callbackItems[y].definitionOrder,
          gmtCreate: callbackItems[y].gmtCreate
        })
      }
    }
    console.log('----expressObj---新返回回来的---', expressObj);
  }
  render() {
    const { expression, saveExpression, callbackItemDefinitions } = this.state;
    return (
      <div>
        <DragDropContextProvider backend={HTML5Backend}>
          <div>
            <DeviceTypeNodes
              sourceName="label"
              fromIt={false}
              deviceType={undefined}
              subjectType={undefined}
            >
            </DeviceTypeNodes>
            <div className="config-context">
              <Button type="primary" className="new-add-or-btn" onClick={this.handleAddMonitor}>
                新增表达式
              </Button>
              <div className="local-expression">
                <MonitorItemExpression 
                  expressionItem = { expression }
                  parentHandler = { this.parentHandler }
                  saveExpression = { saveExpression }
                  callbackItemDefinitions = { callbackItemDefinitions }
                />
              </div>
              <Button type="primary" onClick={this.handleSubmit} style={{ marginTop: '20px', marginLeft: '45%'}}>保存</Button>
            </div>
          </div>
        </DragDropContextProvider>
        
      </div>
    );
  }
}

