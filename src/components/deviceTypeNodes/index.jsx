import React from 'react';
import { Tree, Search } from '@alife/aisc';
import _ from 'lodash';
import DragSource from '../dragSource';
import ConnectDragSource from '../connectDragSource';
import { customMetricItems } from '@components/datas/customMetricItems';

console.log('----customMetricItems----', customMetricItems);

import './style.less';

function TreeNodeTag(props) {
  let { children, linkable } = props
  return <div className={`label${linkable ? ' active' : ''}`}>{children}</div>
}

const isNull = val => val === '' || val === undefined || val === null

export default class MonitorTree extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollTop: document.scrollingElement.scrollTop,
      searchKey: '',
      dataSource: [],
    }
  }
  componentDidMount() {
    // 模拟ajax请求
    setTimeout(() => {
      this.setState({
        dataSource: customMetricItems,
      });
    }, 0);
  }
  loop = obj => {
    const { sourceName, deviceType, subjectType, fromIt } = this.props
    const { searchKey, expandedKeys } = this.state
    const Source = ConnectDragSource(DragSource, sourceName);
    return (...args) => {
      return obj.data && obj.data.length && obj.data.filter(o => {
        if (!o.linkable) {
          return true
        }
        let subjectFilterValue = true
        if (o.linkable && !isNull(subjectType)) {
          if (o.subjectType != subjectType) {
            subjectFilterValue = false
          }
        }
        if (o.linkable && !isNull(fromIt)) {
          return subjectFilterValue && new RegExp(searchKey, 'gi').test(o.search)
        }
      }).map((o, i) => {
        let key = args.concat(i).join('-')
        let linkable = o.linkable;
        let child = <TreeNodeTag key={key} value={o.value} linkable={linkable}>{o.name}</TreeNodeTag>
        if (!o.linkable) {
          // 默认不展开全部，因为三层的数据量大 会造成长时间的浏览器卡死
          this.defaultExpandedKeys =
            !searchKey && !deviceType ? [] : deviceType ?
              this.defaultExpandedKeys.concat(key) : this.defaultExpandedKeys.concat(new RegExp(searchKey).test(o.name) ?
                '' : key).filter(Boolean)
          // this.defaultExpandedKeys = this.defaultExpandedKeys.filter(o => o.split('-').length < 3)
          this.defaultExpandedKeys = Array.isArray(expandedKeys) ? expandedKeys : _.uniq(this.defaultExpandedKeys).filter(o => {
            if (deviceType) return true
            if (o.split('-').length === 3) {
              const childrenKeys = this.defaultExpandedKeys.filter(o => o.split('-').length > 3)
              return childrenKeys.some(_o => new RegExp(o).test(_o))
            }
            return true
          })
        }
        let label = o.linkable? <Source value={o} key={key}>{child}</Source>: child
        return <Tree.Node name={o.name} isSubType={o.isSubType} key={key} title={label}>{
          o.data && o.data.length > 0 ? this.loop(o).apply(this, args.concat(i)) : ''
        }</Tree.Node>
      })
    }
  }
  formatTree = dataSource => {
    let children = dataSource.map((o, i) =>{
      return this.loop(o)(i) && this.loop(o)(i).filter(o =>
        o.props.isSubType ?
          o.props.children.some(_o => _o.props.children.length)
          :
          o.props.children.length > 0
      )
   });
    const {searchKey} = this.state
    if (searchKey) {
      _.flatten(children).forEach(o => {
        if(o){
           if (!o.props.isSubType) return
           if (new RegExp(searchKey).test(o.props.name)) return
        o.props.children.forEach((_o, i) => {
          if (!_o.props.children.length && !new RegExp(searchKey).test(_o.props.name)) {
            o.props.children[i] = null
          }
        })
        }
      })
    }

    if (children.length === 0) return
    //注释掉以前的默认进来箭头展开
    // return <Tree onExpand={this.setExpandedKeys} expandedKeys={this.defaultExpandedKeys} showLine>
    //   {children}
    // </Tree>
    return <Tree onExpand={this.setExpandedKeys} showLine>
      {children}
    </Tree>
  }
  setExpandedKeys = expandedKeys => {
    this.setState({
      expandedKeys
    })
  }
  getExpandKeys = children => {
    return _.flatten(children.map(child => {
      if (child.props.children.length) return this.getExpandKeys(child.props.children)
      return { name: child.props.name, key: child.key }
    }))
  }

  onSearch = (v) => {
    // console.log(v)
    this.willUpdateState = true
    this.setState({
      searchKey: v.key,
      expandedKeys: void 0,
    })
  }

  render() {
    this.defaultExpandedKeys = []
    let { dataSource } = this.state;

    return <div ref={ref => this.container = ref} className="device-type-nodes" style={{ top }}>
      <div className="flex column" title={'指标查询'} style={{ color: '#fff' }}>
        <Search onSearch={this.onSearch} style={{ marginBottom: 12, width: '100%' }} />
        {
          this.state.searchKey === ''
            ? this.formatTree([{
              name: '0-1',
              data: dataSource
            }])
            : this.formatTree(dataSource)
        }
      </div>
    </div>
  }
}