/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([647,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(33))(0);

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(33))(10);

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(33))(28);

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ar": 154,
	"./ar.js": 154,
	"./de": 155,
	"./de.js": 155,
	"./es": 156,
	"./es.js": 156,
	"./fr": 157,
	"./fr.js": 157,
	"./hi": 158,
	"./hi.js": 158,
	"./it": 159,
	"./it.js": 159,
	"./ja": 160,
	"./ja.js": 160,
	"./ko": 161,
	"./ko.js": 161,
	"./pt": 162,
	"./pt.js": 162,
	"./ru": 163,
	"./ru.js": 163,
	"./zh-cn": 164,
	"./zh-cn.js": 164,
	"./zh-hk": 165,
	"./zh-hk.js": 165,
	"./zh-tw": 166,
	"./zh-tw.js": 166
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 298;

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = _dll_vendor;

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(33))(50);

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(33))(53);

/***/ }),

/***/ 643:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 645:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 647:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: delegated ./node_modules/_react@16.14.0@react/index.js from dll-reference _dll_vendor
var _react_16_14_0_reactfrom_dll_reference_dll_vendor = __webpack_require__(0);
var _react_16_14_0_reactfrom_dll_reference_dll_vendor_default = /*#__PURE__*/__webpack_require__.n(_react_16_14_0_reactfrom_dll_reference_dll_vendor);

// EXTERNAL MODULE: delegated ./node_modules/_react-dom@16.14.0@react-dom/index.js from dll-reference _dll_vendor
var _react_dom_16_14_0_react_domfrom_dll_reference_dll_vendor = __webpack_require__(7);
var _react_dom_16_14_0_react_domfrom_dll_reference_dll_vendor_default = /*#__PURE__*/__webpack_require__.n(_react_dom_16_14_0_react_domfrom_dll_reference_dll_vendor);

// EXTERNAL MODULE: ./node_modules/_@alife_aisc@2.9.76@@alife/aisc/lib/index.js
var lib = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/_react-dnd@3.0.2@react-dnd/lib/index.js
var _react_dnd_3_0_2_react_dnd_lib = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/_react-dnd-html5-backend@3.0.2@react-dnd-html5-backend/lib/index.js
var _react_dnd_html5_backend_3_0_2_react_dnd_html5_backend_lib = __webpack_require__(253);
var _react_dnd_html5_backend_3_0_2_react_dnd_html5_backend_lib_default = /*#__PURE__*/__webpack_require__.n(_react_dnd_html5_backend_3_0_2_react_dnd_html5_backend_lib);

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__(621);

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.regexp.search.js
var es6_regexp_search = __webpack_require__(244);

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__(91);

// EXTERNAL MODULE: ./node_modules/_lodash@4.17.21@lodash/lodash.js
var lodash = __webpack_require__(15);
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// CONCATENATED MODULE: ./src/components/dragSource.js

class dragSource_Source extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["Component"] {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      children
    } = this.props;
    const opacity = isDragging ? 0.25 : 1;
    return connectDragSource( /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", {
      style: {
        opacity,
        cursor: 'move',
        display: 'inline-block'
      }
    }, children));
  }

}
// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__(142);

// CONCATENATED MODULE: ./src/components/connectDragSource.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const source = {
  beginDrag(props, monitor, component) {
    if (!component) {
      return;
    }

    const html = component.props && component.props.html;
    const value = component.props && component.props.value;
    return _objectSpread(_objectSpread({}, props), {}, {
      html,
      value
    });
  }

};
/* harmony default export */ var components_connectDragSource = (function (Component, type) {
  return Object(_react_dnd_3_0_2_react_dnd_lib["DragSource"])(type || 'aisc', source, function (connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    };
  })(Component);
});
// CONCATENATED MODULE: ./src/components/datas/customMetricItems.js
const customMetricItems = [{
  'name': '自定义指标',
  data: [{
    "name": "湿度",
    "data": [{
      "pointTypeCode": "1002",
      "deviceTypeName": "湿度",
      "deviceTypeCode": "60002",
      "isLabel": true,
      "name": "测试温度1 1002",
      "linkable": true,
      "customName": "测试温度1",
      "customId": "60002_1002"
    }, {
      "pointTypeCode": "1003",
      "deviceTypeName": "湿度",
      "deviceTypeCode": "60002",
      "isLabel": true,
      "name": "测试温度2 1003",
      "linkable": true,
      "customName": "测试温度2",
      "customId": "60002_1003"
    }, {
      "pointTypeCode": "1004",
      "deviceTypeName": "湿度",
      "deviceTypeCode": "60002",
      "isLabel": true,
      "name": "测试温度3 1004",
      "linkable": true,
      "customName": "测试温度3",
      "customId": "60002_1004"
    }, {
      "pointTypeCode": "1005",
      "deviceTypeName": "湿度",
      "deviceTypeCode": "60002",
      "isLabel": true,
      "name": "测试温度4 1005",
      "linkable": true,
      "customName": "测试温度4",
      "customId": "60002_1005"
    }],
    "deviceType": "60002"
  }, {
    "name": "湿度22",
    "data": [{
      "pointTypeCode": "1002",
      "deviceTypeName": "湿度",
      "deviceTypeCode": "60002",
      "isLabel": true,
      "name": "测试湿度1 1002",
      "linkable": true,
      "customName": "测试湿度1",
      "customId": "60002_1002"
    }, {
      "pointTypeCode": "1003",
      "deviceTypeName": "湿度",
      "deviceTypeCode": "60002",
      "isLabel": true,
      "name": "测试湿度2 1003",
      "linkable": true,
      "customName": "测试湿度2",
      "customId": "60002_1003"
    }, {
      "pointTypeCode": "1004",
      "deviceTypeName": "湿度",
      "deviceTypeCode": "60002",
      "isLabel": true,
      "name": "测试湿度3 1004",
      "linkable": true,
      "customName": "测试湿度3",
      "customId": "60002_1004"
    }, {
      "pointTypeCode": "1005",
      "deviceTypeName": "湿度",
      "deviceTypeCode": "60002",
      "isLabel": true,
      "name": "测试湿度4 1005",
      "linkable": true,
      "customName": "测试湿度4",
      "customId": "60002_1005"
    }],
    "deviceType": "60002"
  }]
}];
// EXTERNAL MODULE: ./src/components/deviceTypeNodes/style.less
var deviceTypeNodes_style = __webpack_require__(643);

// CONCATENATED MODULE: ./src/components/deviceTypeNodes/index.jsx




function deviceTypeNodes_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







console.log('----customMetricItems----', customMetricItems);


function TreeNodeTag(props) {
  let {
    children,
    linkable
  } = props;
  return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
    className: "label".concat(linkable ? ' active' : '')
  }, children);
}

const isNull = function isNull(val) {
  return val === '' || val === undefined || val === null;
};

class deviceTypeNodes_MonitorTree extends _react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.PureComponent {
  constructor(props) {
    var _this;

    super(props);
    _this = this;

    deviceTypeNodes_defineProperty(this, "loop", function (obj) {
      const {
        sourceName,
        deviceType,
        subjectType,
        fromIt
      } = _this.props;
      const {
        searchKey,
        expandedKeys
      } = _this.state;
      const Source = components_connectDragSource(dragSource_Source, sourceName);
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return obj.data && obj.data.length && obj.data.filter(function (o) {
          if (!o.linkable) {
            return true;
          }

          let subjectFilterValue = true;

          if (o.linkable && !isNull(subjectType)) {
            if (o.subjectType != subjectType) {
              subjectFilterValue = false;
            }
          }

          if (o.linkable && !isNull(fromIt)) {
            return subjectFilterValue && new RegExp(searchKey, 'gi').test(o.search);
          }
        }).map(function (o, i) {
          let key = args.concat(i).join('-');
          let linkable = o.linkable;
          let child = /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(TreeNodeTag, {
            key: key,
            value: o.value,
            linkable: linkable
          }, o.name);

          if (!o.linkable) {
            // 默认不展开全部，因为三层的数据量大 会造成长时间的浏览器卡死
            _this.defaultExpandedKeys = !searchKey && !deviceType ? [] : deviceType ? _this.defaultExpandedKeys.concat(key) : _this.defaultExpandedKeys.concat(new RegExp(searchKey).test(o.name) ? '' : key).filter(Boolean); // this.defaultExpandedKeys = this.defaultExpandedKeys.filter(o => o.split('-').length < 3)

            _this.defaultExpandedKeys = Array.isArray(expandedKeys) ? expandedKeys : lodash_default.a.uniq(_this.defaultExpandedKeys).filter(function (o) {
              if (deviceType) return true;

              if (o.split('-').length === 3) {
                const childrenKeys = _this.defaultExpandedKeys.filter(function (o) {
                  return o.split('-').length > 3;
                });

                return childrenKeys.some(function (_o) {
                  return new RegExp(o).test(_o);
                });
              }

              return true;
            });
          }

          let label = o.linkable ? /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(Source, {
            value: o,
            key: key
          }, child) : child;
          return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Tree"].Node, {
            name: o.name,
            isSubType: o.isSubType,
            key: key,
            title: label
          }, o.data && o.data.length > 0 ? _this.loop(o).apply(_this, args.concat(i)) : '');
        });
      };
    });

    deviceTypeNodes_defineProperty(this, "formatTree", function (dataSource) {
      let children = dataSource.map(function (o, i) {
        return _this.loop(o)(i) && _this.loop(o)(i).filter(function (o) {
          return o.props.isSubType ? o.props.children.some(function (_o) {
            return _o.props.children.length;
          }) : o.props.children.length > 0;
        });
      });
      const {
        searchKey
      } = _this.state;

      if (searchKey) {
        lodash_default.a.flatten(children).forEach(function (o) {
          if (o) {
            if (!o.props.isSubType) return;
            if (new RegExp(searchKey).test(o.props.name)) return;
            o.props.children.forEach(function (_o, i) {
              if (!_o.props.children.length && !new RegExp(searchKey).test(_o.props.name)) {
                o.props.children[i] = null;
              }
            });
          }
        });
      }

      if (children.length === 0) return; //注释掉以前的默认进来箭头展开
      // return <Tree onExpand={this.setExpandedKeys} expandedKeys={this.defaultExpandedKeys} showLine>
      //   {children}
      // </Tree>

      return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Tree"], {
        onExpand: _this.setExpandedKeys,
        showLine: true
      }, children);
    });

    deviceTypeNodes_defineProperty(this, "setExpandedKeys", function (expandedKeys) {
      _this.setState({
        expandedKeys
      });
    });

    deviceTypeNodes_defineProperty(this, "getExpandKeys", function (children) {
      return lodash_default.a.flatten(children.map(function (child) {
        if (child.props.children.length) return _this.getExpandKeys(child.props.children);
        return {
          name: child.props.name,
          key: child.key
        };
      }));
    });

    deviceTypeNodes_defineProperty(this, "onSearch", function (v) {
      // console.log(v)
      _this.willUpdateState = true;

      _this.setState({
        searchKey: v.key,
        expandedKeys: void 0
      });
    });

    this.state = {
      scrollTop: document.scrollingElement.scrollTop,
      searchKey: '',
      dataSource: []
    };
  }

  componentDidMount() {
    var _this2 = this;

    // 模拟ajax请求
    setTimeout(function () {
      _this2.setState({
        dataSource: customMetricItems
      });
    }, 0);
  }

  render() {
    var _this3 = this;

    this.defaultExpandedKeys = [];
    let {
      dataSource
    } = this.state;
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
      ref: function ref(_ref) {
        return _this3.container = _ref;
      },
      className: "device-type-nodes",
      style: {
        top
      }
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
      className: "flex column",
      title: '指标查询',
      style: {
        color: '#fff'
      }
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Search"], {
      onSearch: this.onSearch,
      style: {
        marginBottom: 12,
        width: '100%'
      }
    }), this.state.searchKey === '' ? this.formatTree([{
      name: '0-1',
      data: dataSource
    }]) : this.formatTree(dataSource)));
  }

}
// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__(92);

// CONCATENATED MODULE: ./src/components/target.jsx
function target_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function target_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { target_ownKeys(Object(source), true).forEach(function (key) { target_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { target_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function target_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const target_Clone = function Clone(obj, options) {
  if (obj !== void 0 && obj.$$typeof === Symbol.for('react.element')) {
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.cloneElement(obj, target_objectSpread({}, options));
  }

  return obj;
};

class target_Target extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["PureComponent"] {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      canDrop,
      isOver,
      connectDropTarget,
      children,
      className = '',
      onChange = function (e) {
        return e;
      }
    } = this.props;
    const border = canDrop && isOver ? '1px solid #2e85ff' : '';
    const transition = '0.3s border';
    console.log('----children----', children);
    return connectDropTarget( /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", {
      className: "".concat(canDrop && isOver ? 'hover ' : '').concat(className)
    }, target_Clone(children, {
      style: target_objectSpread({
        border,
        transition
      }, children.props.style)
    })));
  }

}
// CONCATENATED MODULE: ./src/components/connectDropTarget.js


const boxTarget = {
  drop: function drop(props, monitor, component) {
    if (!component) {
      return;
    }

    let children = props.children;

    if (Array.isArray(children)) {
      throw 'You should pass a single node for the chidlren';
    }

    if (props.exchange) {
      let hoverIndex = props.index;
      let targetIndex = monitor.getItem().index;

      if (hoverIndex !== targetIndex) {
        let onChange = children.props.onChange;
        onChange(hoverIndex, targetIndex, component);
      }

      return;
    }

    if (!component.props.isOverCurrent) return;
    let onChange = children.props.onChange;
    const index = children.props.index || 0;
    const subIndex = children.props.subIndex || 0;
    onChange ? onChange(monitor.getItem().value, component, undefined, undefined, index, subIndex) : null;
  },
  hover: function hover(props, monitor, component) {
    if (!component) {
      return null;
    }

    window.isChildOver = false;

    if (component.props.isOver && component.props.isChild) {
      window.isChildOver = true;
    }

    if (props.hover) props.hover(props, monitor, component);
  },
  canDrop: function canDrop(props, monitor) {
    let {
      allow
    } = props;
    if (!allow) return true;
    let component = monitor.getItem();

    if (allow(component)) {
      return true;
    } else {
      return false;
    }
  }
};
/* harmony default export */ var components_connectDropTarget = (function (Component, type) {
  return Object(_react_dnd_3_0_2_react_dnd_lib["DropTarget"])(type || 'aisc', boxTarget, function (connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({
        shallow: true
      }),
      canDrop: monitor.canDrop()
    };
  })(Component);
});
// CONCATENATED MODULE: ./src/components/arithmetic.js





const arithmetic_dragSource = function dragSource(canDropIn) {
  return components_connectDragSource(dragSource_Source, canDropIn);
};

const DragSource = arithmetic_dragSource('root');
const BlankDragSource = arithmetic_dragSource('blank');
const TextDragSource = arithmetic_dragSource('text');
const regularExp = function regularExp(symbol) {
  return {
    value: function value(left, right) {
      return "".concat(left ? "R$x" : '').concat(symbol).concat(right ? "R$x" : '');
    },
    type: 'arithExp'
  };
};
const bracketsExp = function bracketsExp() {
  return {
    value: function value() {
      return "(BLANK$)";
    },
    type: 'bracketsExp'
  };
};
const textExp = function textExp() {
  return {
    value: function value() {
      return "TEXT$";
    },
    type: 'text'
  };
};
class arithmetic_Arithmetric extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["Component"] {
  render() {
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Card"], {
      title: "算术表达式"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(DragSource, {
      value: regularExp('+')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, "+")), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(DragSource, {
      value: regularExp('-')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, "-")), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(DragSource, {
      value: regularExp('*')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, "*")), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(DragSource, {
      value: regularExp('/')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, "/")), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(BlankDragSource, {
      value: bracketsExp()
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "()"))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(TextDragSource, {
      value: textExp()
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "number"))));
  }

}
// CONCATENATED MODULE: ./src/components/relations.js





const relations_dragSource = function dragSource(canDropIn) {
  return components_connectDragSource(dragSource_Source, canDropIn);
};

const relations_DragSource = relations_dragSource('root');
const relationExp = function relationExp(symbol) {
  return {
    value: function value(left, right) {
      return "".concat(left ? "R$x" : '').concat(symbol).concat(right ? "R$x" : '');
    },
    type: 'relationExp'
  };
};
class relations_Relation extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["Component"] {
  render() {
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Card"], {
      title: "\u5173\u7CFB\u8868\u8FBE\u5F0F"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(relations_DragSource, {
      value: relationExp('==')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "=="))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(relations_DragSource, {
      value: relationExp('!=')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "!="))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(relations_DragSource, {
      value: relationExp('>=')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, ">="))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(relations_DragSource, {
      value: relationExp('<=')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "<="))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(relations_DragSource, {
      value: relationExp('>')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, ">"))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(relations_DragSource, {
      value: relationExp('<')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "<"))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(relations_DragSource, {
      value: relationExp('&&')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "&&"))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(relations_DragSource, {
      value: relationExp('||')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "||"))));
  }

}
// CONCATENATED MODULE: ./src/components/logic.js





const logic_dragSource = function dragSource(canDropIn) {
  return components_connectDragSource(dragSource_Source, canDropIn);
};

const RegDragSource = logic_dragSource('root');
const logic_regularExp = function regularExp(symbol) {
  return {
    value: function value() {
      return "".concat(symbol, "(L$").concat(symbol, ")");
    },
    type: 'logicExp'
  };
};
class logic_Logic extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["Component"] {
  render() {
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Card"], {
      title: "\u903B\u8F91\u8868\u8FBE\u5F0F"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(RegDragSource, {
      value: logic_regularExp('sum')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "sum"))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(RegDragSource, {
      value: logic_regularExp('avg')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "avg"))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(RegDragSource, {
      value: logic_regularExp('max')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "max"))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(RegDragSource, {
      value: logic_regularExp('min')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "min"))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(RegDragSource, {
      value: logic_regularExp('count')
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      size: "small",
      type: "primary"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, "count"))));
  }

}
// CONCATENATED MODULE: ./src/components/container.jsx


function container_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function container_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { container_ownKeys(Object(source), true).forEach(function (key) { container_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { container_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function container_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class container_Container extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["Component"] {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;

    container_defineProperty(this, "handleClear", function () {
      _this.props.onClear();
    });
  }

  render() {
    const {
      style,
      placeholder,
      hasClear,
      className = '',
      onChange,
      value,
      origin,
      disabled
    } = this.props;
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("label", {
      "data-v": origin,
      className: "".concat(className).concat(hasClear ? ' clear' : '').concat(disabled ? ' disabled' : ''),
      style: container_objectSpread(container_objectSpread({}, style), {}, {
        position: 'relative'
      })
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", {
      placeholder: placeholder
    }, value), !disabled && hasClear ? /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Icon"], {
      type: "delete-filling",
      onClick: this.handleClear,
      className: "clear-icon"
    }) : '');
  }

}
// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__(250);

// CONCATENATED MODULE: ./src/components/contentEditable.jsx
function contentEditable_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const NUMBER_REG = /^([0-9]{1,}[.]?[0-9]*)$/;

class contentEditable_ContentEditable extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["Component"] {
  constructor(props) {
    var _this;

    super();
    _this = this;

    contentEditable_defineProperty(this, "setFocus", function () {
      _this.element.textContent = _this.props.content;

      _this.element.focus();
    });

    contentEditable_defineProperty(this, "setCaret", function () {
      if (_this.element) {
        var range = document.createRange();
        var sel = window.getSelection();
        var value = _this.element.textContent;

        if (value === "") {
          range.setStart(_this.element, 0);
        } else {
          range.setStart(_this.element.firstChild, _this.cursorOffset);
        }

        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    });

    contentEditable_defineProperty(this, "onChange", function (type) {
      return function (ev) {
        const {
          onChange = function (e) {
            return e;
          }
        } = _this.props;
        _this.isBlur = false;
        _this.willUpdate = true;
        const rawValue = _this.element.innerText;
        _this.cursorOffset = document.getSelection().anchorOffset;

        if (rawValue === "") {
          onChange(ev, rawValue);
          return;
        }

        switch (type) {
          case 'number':
            if (NUMBER_REG.test(rawValue)) {
              onChange(ev, rawValue);
              return;
            }

            _this.cursorOffset -= rawValue.length - _this.props.content.length;
            onChange(ev, _this.props.content);
            return;

          default:
            if (_this.state.value !== rawValue) {
              onChange(ev, rawValue);
            }

        }
      };
    });

    contentEditable_defineProperty(this, "onPaste", function (ev) {
      const value = _this.element.innerText;
      _this.cursorOffset = document.getSelection().anchorOffset + (value.length - _this.state.value.length);

      _this.props.onPaste(ev);
    });

    contentEditable_defineProperty(this, "onBlur", function (ev) {
      const {
        content
      } = _this.props;
      _this.isBlur = true;
      _this.cursorOffset = content && content.length;

      if (_this.props.onBlur) {
        _this.props.onBlur(ev, _this.element.innerText);
      }
    });

    contentEditable_defineProperty(this, "onFocus", function (ev) {
      _this.isBlur = false;
    });

    this.state = {
      value: ""
    };
  }

  componentDidMount() {
    this.isBlur = true;
  }

  shouldComponentUpdate(nextProps) {
    if (this.willUpdate || nextProps.content !== this.props.content) {
      this.didUpdate = true;
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    var _this2 = this;

    if (this.didUpdate) {
      if (!this.isBlur && this.element) {
        setTimeout(function () {
          _this2.setFocus();

          _this2.setCaret();
        });
      }

      this.didUpdate = false;
    }
  }

  render() {
    var _this3 = this;

    const {
      content,
      className,
      style,
      type,
      placeholder
    } = this.props;
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
      ref: function ref(_ref) {
        return _this3.element = _ref;
      },
      className: className,
      style: {
        whiteSpace: 'pre-wrap',
        style,
        borderRadius: 2
      },
      contentEditable: true,
      onBlur: this.onBlur,
      onInput: this.onChange(type),
      onPaste: this.onPaste,
      onFocus: this.onFocus,
      placeholder: placeholder
    }, content);
  }

}

/* harmony default export */ var contentEditable = (contentEditable_ContentEditable);
// CONCATENATED MODULE: ./src/components/baseExp.js




function baseExp_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const baseExp_DropTarget = function DropTarget(props) {
  // primaryKey 用来关联可拖拽项，丢失可导致无法推拽的问题
  let P = components_connectDropTarget(target_Target, props.primaryKey);
  return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(P, props, props.children);
};

class baseExp_BaseExp extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["Component"] {
  constructor(props) {
    var _this;

    super(props);
    _this = this;

    baseExp_defineProperty(this, "handleChange", function (start, end) {
      return function (val, component) {
        const {
          index,
          subIndex
        } = _this.props;

        _this.props.onChange(val, component, start, end, index, subIndex);
      };
    });

    baseExp_defineProperty(this, "handleTextChange", function (start, end) {
      return function (e, val) {
        const {
          index,
          subIndex
        } = _this.props;

        _this.props.onChange(val, null, start, end, index, subIndex);
      };
    });
  }

  render() {
    var _this2 = this;

    const {
      value
    } = this.props;
    if (!value) return null;
    const {
      tokens
    } = value;
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
      className: "exp-context"
    }, tokens && tokens.map(function (o) {
      if (o.type.label === 'eof') {
        return;
      }

      console.log('-------o.value-----', o.value);
      let val = o.value && o.value.toString();

      if (/^[A-Z]+\$/.test(val)) {
        let temp = null;
        let splits = o.value.split('$');
        let type = splits[0];
        let key = splits[1];

        switch (type) {
          case 'BLANK':
            temp = /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(baseExp_DropTarget, {
              empty: true,
              primaryKey: ['root', 'label', 'blank', 'relationExp', 'text']
            }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(container_Container, {
              className: "exp-container",
              onChange: _this2.handleChange(o.start, o.end)
            }));
            break;

          case 'A':
            temp = /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(baseExp_DropTarget, {
              empty: true,
              primaryKey: ['root', 'label', 'blank', 'relationExp', 'text']
            }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(container_Container, {
              className: "exp-container",
              onChange: _this2.handleChange(o.start, o.end)
            }));
            break;

          case 'R':
            temp = /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(baseExp_DropTarget, {
              empty: true,
              primaryKey: ['root', 'label', 'blank', 'relationExp', 'text']
            }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(container_Container, {
              className: "exp-container",
              onChange: _this2.handleChange(o.start, o.end)
            }));
            break;

          case 'L':
            {
              /* 先注释掉
              if (key === 'count') {
                temp = <DropTarget empty primaryKey={['relationExp', 'label', 'blank', 'text']}>
                  <Container className="exp-container" onChange={this.handleChange(o.start, o.end)} />
                </DropTarget>
                break
              }
              */
            }
            temp = /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(baseExp_DropTarget, {
              primaryKey: ['relationExp', 'label', 'blank', 'text', 'logicExp']
            }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(container_Container, {
              className: "exp-container",
              onChange: _this2.handleChange(o.start, o.end)
            }));
            break;

          case 'LABEL':
            temp = /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(baseExp_DropTarget, {
              primaryKey: "label"
            }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(container_Container, {
              className: "exp-container",
              value: key,
              onChange: _this2.handleChange(o.start, o.end)
            }));
            break;

          case 'TEXT':
            temp = /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(contentEditable, {
              type: "number",
              content: key.replace(/Q/, '.'),
              placeholder: "\u503C",
              onBlur: _this2.handleTextChange(o.start, o.end),
              className: "exp-container small"
            });
            break;
        }

        return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", {
          onClick: _this2.handleSelect,
          className: "exp-tag",
          "data-start": o.start,
          "data-end": o.end
        }, temp);
      }

      return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", {
        onClick: _this2.handleSelect,
        "data-start": o.start,
        "data-end": o.end
      }, o.value || o.type.label);
    }));
  }

}
// CONCATENATED MODULE: ./src/components/datas/deviceTypeList.js
const deviceTypeList = [{
  code: "1",
  name: "测试1"
}, {
  code: "2",
  name: "测试2"
}, {
  code: "3",
  name: "测试3"
}, {
  code: "4",
  name: "测试4"
}, {
  code: "5",
  name: "测试5"
}, {
  code: "6",
  name: "测试6"
}];
// CONCATENATED MODULE: ./src/components/utils.js




function $generate(ast) {
  if (!ast || !ast.tokens) return '';
  let t = ast.tokens && ast.tokens.map(function (o) {
    if (o.type.label === 'eof') return '';
    return o.value || o.type.label;
  }).join('');
  return t;
}
function ast2Str(ast) {
  if (!ast) return '';

  if (ast.conditionDefinition) {
    ast = ast.conditionDefinition;
  }

  let t = ast.tokens && ast.tokens.map(function (o) {
    if (o.type.label === 'eof') return '';

    if (o.value) {
      if (/LABEL\$(.*)\$[0-9_]/.test(o.value)) {
        return o.value.split('$')[2];
      } else if (/TEXT\$(.*)/.test(o.value)) {
        return o.value.split('$')[1];
      } else {
        return o.value;
      }
    }

    return o.type.label;
  }).join('');

  if (/(\(\S*-\S*\))/.test(t)) {
    t = t.replace(/LABEL\$\S*\$/, '');
  }

  return t;
}
function replaceDefinition(str) {
  if (!str) return;
  str = str.replace(/[\[\]]/g, '');
  str = str.replace(/([a-z]*)\(([^()]*)\)/g, '$1([$2])');
  str = str.replace(/Q/g, '.');
  return str;
} // 特殊字符转换成繁体字

function charToChinese(currentCode) {
  return currentCode.replace(/\[/g, '佐').replace(/\]/g, '佑').replace(/\（/g, '琢').replace(/\）/g, '鼬').replace(/\%/g, '鼢').replace(/\s/g, '').replace(/——/g, '線').replace(/\_/g, '劃').replace(/\【/g, '塗').replace(/\】/g, '華').replace(/\{/g, '師').replace(/\}/, '學').replace(/\{/g, '轉').replace(/\}/, '換').replace(/℃/g, '攝').replace(/、/g, '頓').replace(/《/g, '體').replace(/》/g, '簡').replace(/，/g, '竇').replace(/；/g, '墳').replace(/#/g, '賤').replace(/。/g, '鞫').replace(/"/g, '癮').replace(/@/g, '藹');
} // 繁体字转换成特殊字符

function chineseToChar(currentCode) {
  return currentCode.replace(/佐/g, '[').replace(/佑/g, ']').replace(/琢/g, '（').replace(/書/g, '(').replace(/鼬/g, '）').replace(/鼢/g, '%').replace(/筆/g, ')').replace(/頓/g, '、').replace(/賈/g, '+').replace(/撐/g, '*').replace(/線/g, '——').replace(/劃/g, '_').replace(/塗/g, '【').replace(/華/g, '】').replace(/師/g, '{').replace(/廚/g, '/').replace(/學/g, '}').replace(/轉/g, '{').replace(/換/g, '}').replace(/國/g, '-').replace(/攝/g, '℃').replace(/撐/g, '*').replace(/體/g, '《').replace(/簡/g, '》').replace(/竇/g, '，').replace(/墳/g, '；').replace(/賤/g, '#').replace(/鞫/g, '。').replace(/癮/g, '"').replace(/藹/g, '@');
}
function validatorData(data) {
  let flag = false;
  const chars = ['+', '-', '*', '/', '==', '!=', '>=', '<=', '>', '<'];

  for (let i = 0, ilen = chars.length; i < ilen; i++) {
    if (data.indexOf(chars[i]) > -1) {
      const strs = data.split(chars[i]);

      if (strs.length) {
        for (let j = 0, jlen = strs.length; j < jlen; j++) {
          if (strs[j] === '') {
            flag = true;
            break;
          }
        }
      }
    }
  }

  return flag;
} // 获取url后的参数

function getUrlParams(param) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (pair[0] == param) {
      return pair[1];
    }
  }

  return false;
}
function validatorFunc(expressObj) {
  const isStr = function isStr(str) {
    return Object.prototype.toString.call(str) == "[object String]";
  };

  if (expressObj && expressObj.length) {
    for (let k = 0, klen = expressObj.length; k < klen; k++) {
      const cItem = expressObj[k];

      if (!expressObj[k].isAlreadyRemove) {
        const conditionDefinition = cItem.conditionDefinition || cItem.definition;

        if (isStr(conditionDefinition)) {
          if (conditionDefinition.indexOf('R$x') > -1 || conditionDefinition.indexOf('BLANK$') > -1 || conditionDefinition.indexOf('L$sum') > -1 || conditionDefinition.indexOf('L$avg') > -1 || conditionDefinition.indexOf('L$max') > -1 || conditionDefinition.indexOf('L$min') > -1 || conditionDefinition.indexOf('L$count') > -1 || validatorData(conditionDefinition)) {
            lib["Feedback"].toast.show({
              type: 'error',
              content: '判断条件请填写完整'
            });
            return;
          }
        } else {
          lib["Feedback"].toast.show({
            type: 'error',
            content: '判断条件请填写完整'
          });
          return;
        }

        if (expressObj && expressObj.length) {
          for (let m = 0, mlen = expressObj.length; m < mlen; m++) {
            const curItem = expressObj[m];

            if (!curItem.isAlreadyRemove) {
              if (!curItem.conditonType) {
                lib["Feedback"].toast.show({
                  type: 'error',
                  content: '关联项请填写完整'
                });
                return;
              }

              if (curItem.conditonType === 2) {
                if (curItem.conditonValue === '') {
                  lib["Feedback"].toast.show({
                    type: 'error',
                    content: '关联项的值请填写完整'
                  });
                  return;
                }
              }
            }
          }
        }
      }
    }
  }

  return true;
}
// CONCATENATED MODULE: ./src/components/monitorItemExpression/index.js



function monitorItemExpression_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














const babylon = __webpack_require__(251);

console.log('----deviceTypeList----', deviceTypeList);
const {
  Combobox
} = lib["Select"]; // 获取下拉框的值，这里没有ajax请求，直接写死数据

const GLOBAL_ARRS = [];
deviceTypeList.forEach(function (item) {
  GLOBAL_ARRS.push({
    label: item.name,
    value: item.name,
    _value: item.code
  });
});
console.log('-----GLOBAL_ARRS----', GLOBAL_ARRS);

const monitorItemExpression_DropTarget = function DropTarget(props) {
  let P = components_connectDropTarget(target_Target, props.primaryKey);
  return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(P, props, props.children);
}; // 关联项


const relationshipItemArrs = [{
  label: '默认',
  value: 1
}, {
  label: '设备类型',
  value: 2
}];
class monitorItemExpression_MonitorItemExpression extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["Component"] {
  constructor(props) {
    var _this;

    super(props);
    _this = this;

    monitorItemExpression_defineProperty(this, "state", {
      defaultExpression: null
    });

    monitorItemExpression_defineProperty(this, "emitChange", function () {
      const {
        expression
      } = _this.state;
      const {
        onChange = function (e) {
          return e;
        }
      } = _this.props;
      onChange(expression);
    });

    monitorItemExpression_defineProperty(this, "handleChange", function (val, component, start, end, index, subIndex) {
      console.log('---xxx----进来了');
      index = index || 0; // 父列表索引

      subIndex = subIndex || 0; // 子列表索引

      let {
        expressionItem,
        parentHandler,
        saveExpression
      } = _this.props;
      let currentCode = '';
      let expressionSingleItem = null;

      if (expressionItem[index].data[subIndex] && expressionItem[index].data[subIndex].conditionDefinition) {
        expressionSingleItem = expressionItem[index].data[subIndex].conditionDefinition;
      } else {
        expressionSingleItem = expressionItem[index].data[subIndex];
      }

      let preCode = $generate(expressionSingleItem);

      if (typeof val === 'string') {
        currentCode = preCode.slice(0, start) + "TEXT$".concat(val) + preCode.slice(end, preCode.length);
      } else if (val.isLabel) {
        currentCode = preCode.slice(0, start) + "LABEL$".concat(val.customName, "$").concat(val.customId) + preCode.slice(end, preCode.length);
      } else {
        switch (val.type) {
          case 'arithExp':
          case 'relationExp':
            currentCode = expressionItem[index] && expressionItem[index].data[subIndex] && !component.props.empty ? val.value(false, true) : val.value(true, true);

            if (start || end) {
              currentCode = preCode.slice(0, start) + currentCode.slice(0, currentCode.length) + preCode.slice(end, preCode.length);
            } else {
              currentCode = preCode + currentCode;
            }

            break;

          case 'logicExp':
          case 'bracketsExp':
          case 'text':
            currentCode = val.value();

            if (start || end) {
              currentCode = preCode.slice(0, start) + currentCode.slice(0, currentCode.length) + preCode.slice(end, preCode.length);
            } else {
              currentCode = val.value();
            }

            break;
        }
      }

      currentCode = charToChinese(currentCode);
      let t = babylon.parse(currentCode.replace(/\./g, 'Q'));
      t.tokens.map(function (o) {
        o.value = o.value ? chineseToChar(o.value) : null;
      });
      expressionItem[index].data[subIndex] = t;
      saveExpression[index].data[subIndex] = t;
      parentHandler(expressionItem, saveExpression);
    });

    monitorItemExpression_defineProperty(this, "handleClear", function (index, subIndex) {
      const {
        expressionItem,
        saveExpression,
        parentHandler
      } = _this.props;

      if (expressionItem[index].data[subIndex] && expressionItem[index].data[subIndex].id) {
        saveExpression[index].data[subIndex].editClear = true;
        saveExpression[index].data[subIndex].deleted = new Date().getTime();
      }

      expressionItem[index].data[subIndex] = null;
      console.log('---expressionItem---', expressionItem);
      parentHandler(expressionItem, saveExpression);
    });

    monitorItemExpression_defineProperty(this, "conditonType", function (item, pIndex) {
      console.log('----item-----', item);
      const {
        expressionItem,
        parentHandler
      } = _this.props;
      expressionItem[pIndex].conditon_type = item.label;
      expressionItem[pIndex].conditon_type_value = item.value;

      if (Number(item.value) === 2) {
        expressionItem[pIndex].deviceTypeLists = GLOBAL_ARRS; // 调用父组件的方法，重新渲染页面

        parentHandler(expressionItem, expressionItem);
      } else {
        expressionItem[pIndex].deviceTypeLists = [];
        expressionItem[pIndex].conditon_deviceName = '';
        expressionItem[pIndex].conditon_deviceName_value = ''; // 调用父组件的方法，重新渲染页面

        parentHandler(expressionItem, expressionItem);
      }
    });

    monitorItemExpression_defineProperty(this, "conditonValue", function (items, pIndex) {
      console.log('-----关联项的值----');
      const {
        expressionItem,
        parentHandler
      } = _this.props;
      let label = '';
      let value = '';

      if (items && items.length) {
        items.forEach(function (item) {
          if (item && item !== "") {
            label += ',' + item.label;
            value += ',' + item._value;
          }
        });
      }

      label = label.substr(1);
      value = value.substr(1);
      expressionItem[pIndex].conditon_deviceName = label;
      expressionItem[pIndex].conditon_deviceName_value = value; // 调用父组件的方法，重新渲染页面

      parentHandler(expressionItem, expressionItem);
    });
  }

  componentDidMount() {
    const {
      value
    } = this.props;

    if (value) {
      this.setState({
        expression: value
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      value
    } = nextProps;

    if (value) {
      this.setState({
        expression: value
      });
    }
  }
  /*
   * @param { rootIndex } 父节点的索引
   * @param { subIndex } 子节点的索引
  */


  removeSubItem(rootIndex, subIndex) {
    console.log('----rootIndex----', rootIndex);
    console.log('----subIndex----', subIndex);
    const {
      expressionItem,
      parentHandler,
      callbackItemDefinitions
    } = this.props;
    const cItem = expressionItem[rootIndex].data[subIndex];
    const callbackItem = callbackItemDefinitions && callbackItemDefinitions[rootIndex] ? callbackItemDefinitions[rootIndex][subIndex] : null; // console.log('----callbackItemDefinitions---', callbackItemDefinitions);

    if (cItem && cItem.id) {
      // 说明是删除修改页面本来有的项 只需要将id改为时间戳，并且增加一个标识 渲染的时候，通过该标示不重新渲染
      if (expressionItem[rootIndex].data[subIndex]) {
        expressionItem[rootIndex].data[subIndex].deleted = new Date().getTime();
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
          callbackItemDefinitions[rootIndex][subIndex].deleted = new Date().getTime();
          callbackItemDefinitions[rootIndex][subIndex].isDeleted = true;
          delete callbackItemDefinitions[rootIndex][subIndex].conditionDefinition;
          expressionItem[rootIndex].data.splice(subIndex, 1);
        }
      } else {
        expressionItem[rootIndex].data.splice(subIndex, 1);
      }
    }

    console.log('----最终返回的数据111---', expressionItem);
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
                isAlreadyRemove: true
              });
            }
          }
        }
      }
    }

    let num = 0;

    if (expressionItem[rootIndex].data) {
      expressionItem[rootIndex].data.forEach(function (item) {
        if (item && item.isDeleted || item && item.isAlreadyRemove) {
          num = num + 1;
        }
      });
    } // 判断是否是最后一项数据, 给父级节点添加标识


    if (num === expressionItem[rootIndex].data.length) {
      expressionItem[rootIndex].isAllRemove = true;
    }

    if (expressionItem[rootIndex].data.length === 0) {
      // 把外层容器删除掉
      expressionItem.splice(rootIndex, 1);
    } // 调用父组件的方法，重新渲染页面


    parentHandler(expressionItem, expressionItem);
  }
  /*
   * @param { rootIndex } 父节点的索引
   * @param { subIndex } 子节点的索引
  */


  addItem(rootIndex, subIndex) {
    console.log('----rootIndex----', rootIndex);
    console.log('----subIndex----', subIndex);
    const {
      expressionItem,
      parentHandler
    } = this.props;
    const {
      defaultExpression
    } = this.state;
    expressionItem[rootIndex].data.push(defaultExpression); // 调用父组件的方法，重新渲染页面

    parentHandler(expressionItem, expressionItem);
  }
  /*
   * 向下移动
  */


  moveDown(rootIndex, subIndex) {
    console.log('---moveDown---'); // 不管是向上移动还是向下移动，父容器是永远不会变的，只改变子节点的数据
    // 向下移动就是把当前的数据插入到数组中的下一个位置上

    const {
      expressionItem,
      parentHandler
    } = this.props;
    const index = subIndex + 1;
    const temp = expressionItem[rootIndex].data[index];
    expressionItem[rootIndex].data[index] = expressionItem[rootIndex].data[subIndex];
    expressionItem[rootIndex].data[subIndex] = temp; // 调用父组件的方法，重新渲染页面

    parentHandler(expressionItem, expressionItem);
  }
  /*
   * 向上移动
  */


  moveUp(rootIndex, subIndex) {
    console.log('---moveUp---'); // 不管是向上移动还是向下移动，父容器是永远不会变的，只改变子节点的数据
    // 向上移动就是把当前的数据插入到数组中的上一个位置上

    const {
      expressionItem,
      parentHandler
    } = this.props;
    const index = subIndex - 1;
    const temp = expressionItem[rootIndex].data[index];
    expressionItem[rootIndex].data[index] = expressionItem[rootIndex].data[subIndex];
    expressionItem[rootIndex].data[subIndex] = temp; // 调用父组件的方法，重新渲染页面

    parentHandler(expressionItem, expressionItem);
  } // 关联项


  render() {
    var _this2 = this;

    const {
      expressionItem
    } = this.props;
    console.log('----渲染数据-22333---expressionItem---', expressionItem);
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
      className: "expression-div"
    }, expressionItem.map(function (pItem, pIndex) {
      const isAllRemove = pItem.isAllRemove;
      return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
        className: "monitor-subItem",
        style: {
          display: isAllRemove ? "none" : "block"
        }
      }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
        className: "expression-left"
      }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Form"], null, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Form"].Item, null, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Select"], {
        placeholder: "\u8BF7\u9009\u62E9\u5173\u8054\u9879",
        style: {
          width: 160
        },
        dataSource: relationshipItemArrs,
        value: pItem.conditon_type_value,
        onChange: function onChange(value, item) {
          _this2.conditonType(item, pIndex);
        }
      })), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Form"].Item, null, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(Combobox, {
        placeholder: "\u8BF7\u9009\u62E9",
        style: {
          width: 160
        },
        dataSource: pItem.deviceTypeLists,
        value: pItem.conditon_deviceName && pItem.conditon_deviceName.split(','),
        multiple: true,
        onChange: function onChange(value, item) {
          _this2.conditonValue(item, pIndex);
        }
      })))), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
        className: "expression-right"
      }, pItem && pItem.data && pItem.data.map(function (item, index) {
        let curItem = item;

        if (item) {
          if (item.conditionDefinition || item.definition) {
            curItem = item.definition || item.conditionDefinition;
          }
        }

        const isShow = !curItem || curItem && !curItem.isDeleted && !curItem.isAlreadyRemove;
        return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
          className: "r-container",
          style: {
            display: isShow ? 'block' : 'none'
          }
        }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(monitorItemExpression_DropTarget, {
          primaryKey: ['root']
        }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(container_Container, {
          onClear: function onClear() {
            _this2.handleClear(pIndex, index);
          },
          className: "next-input next-input-multiple drop-container",
          hasClear: true,
          value: /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(baseExp_BaseExp, {
            value: curItem,
            onChange: _this2.handleChange,
            index: pIndex,
            subIndex: index
          }),
          style: {
            marginRight: '20px',
            display: 'block',
            width: 'auto'
          },
          placeholder: "\u8BF7\u4ECE\u5DE6\u4FA7\u5F15\u7528\u6D4B\u70B9\uFF0C\u4E0B\u65B9\u62D6\u52A8\u8868\u8FBE\u5F0F\u8FDB\u884C\u7F16\u8F91",
          onChange: _this2.handleChange,
          index: pIndex,
          subIndex: index
        })), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Icon"], {
          type: "ashbin-o",
          size: "small",
          onClick: function onClick() {
            _this2.removeSubItem(pIndex, index);
          }
        }), index === 0 && index === pItem.data.length - 1 ? '' : index === 0 ? /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Icon"], {
          type: "shebeishangxian",
          size: "small",
          onClick: function onClick() {
            _this2.moveDown(pIndex, index);
          }
        }) : index === pItem.data.length - 1 ? /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Icon"], {
          type: "shebeixiaxian",
          size: "small",
          onClick: function onClick() {
            _this2.moveUp(pIndex, index);
          }
        }) : /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("span", null, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Icon"], {
          type: "shebeixiaxian",
          size: "small",
          onClick: function onClick() {
            _this2.moveUp(pIndex, index);
          }
        }), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Icon"], {
          type: "shebeishangxian extra-direction",
          size: "small",
          onClick: function onClick() {
            _this2.moveDown(pIndex, index);
          }
        })), index === pItem.data.length - 1 ? /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Icon"], {
          type: "add-circular",
          className: index === 0 && index === pItem.data.length - 1 ? 'add-circular2' : '',
          size: "small",
          onClick: function onClick() {
            _this2.addItem(pIndex, index);
          }
        }) : '');
      })));
    }), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
      style: {
        marginTop: 4
      },
      className: "flex symbols"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(arithmetic_Arithmetric, null), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(relations_Relation, null), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(logic_Logic, null)));
  }

}
// CONCATENATED MODULE: ./src/components/parse.js



const parse_babylon = __webpack_require__(251); // 根据节点id找对应的数据


function getParamsById(nodeId, datas) {
  let obj = null; // 保存过滤后的结果

  const getNodeFunc = function getNodeFunc(datas) {
    if (datas && datas.length) {
      datas.forEach(function (node) {
        if (node.customId === nodeId) {
          obj = node;
          return;
        }

        if (node.data) {
          getNodeFunc(node.data);
        }
      });
    }
  };

  if (datas && datas.length) {
    datas.forEach(function (item) {
      if (item.data && item.data.length) {
        getNodeFunc(item.data);
      }
    });
  }

  return obj;
}

function valueParse(value, dataSource) {
  console.log('---返回--dataSource', dataSource);
  console.log('---kongzhi-----', value);
  let val = value && value.replace(/[\[\]]/g, '').replace(/([0-9]+_[0-9]+_*[0-9]*)/g, function (v1, v2) {
    const obj = getParamsById(v2, dataSource);

    if (obj) {
      if (obj.customId == v2) {
        if (obj.customName && obj.customName.indexOf('+') !== -1) {
          obj.customName = obj.customName.replace(/\+/g, '賈');
        }

        if (obj.customName && obj.customName.indexOf('-') !== -1) {
          obj.customName = obj.customName.replace(/-/g, '國');
        }

        if (obj.customName && obj.customName.indexOf('*') !== -1) {
          obj.customName = obj.customName.replace(/\*/g, '撐');
        }

        if (obj.customName && obj.customName.indexOf('/') !== -1) {
          obj.customName = obj.customName.replace(/\//g, '廚');
        }

        return "LABEL$".concat(obj.customName, "$").concat(v2);
      } else {
        return "TEXT$".concat(v2);
      }
    } else {
      return "TEXT$".concat(v2);
    }
  }).replace(/([\+\-\*\/\=<>])([0-9]+Q?[0-9]*)/g, function (v1, v2, v3) {
    return "".concat(v2, "TEXT$").concat(v3);
  });

  try {
    val = val.replace(/\[/g, '佐').replace(/\]/g, '佑').replace(/[\（]/g, '琢').replace(/\）/g, '鼬').replace(/\%/g, '鼢').replace(/\s/g, '').replace(/\./g, 'Q').replace(/——/g, '線').replace(/\_/g, '劃').replace(/、/g, '頓').replace(/\【/g, '塗').replace(/\】/g, '華').replace(/\{/g, '師').replace(/\}/, '學').replace(/\{/g, '轉').replace(/\}/, '換').replace(/℃/g, '攝').replace(/《/g, '體').replace(/》/g, '簡').replace(/，/g, '竇').replace(/；/g, '墳').replace(/#/g, '賤').replace(/。/g, '鞫')
    /*.replace(/&/g, '壑')*/
    .replace(/"/g, '癮').replace(/@/g, '藹');
    const by = parse_babylon.parse(val);
    by.tokens.map(function (o) {
      o.value = o.value ? o.value.toString().replace(/佐/g, '[').replace(/佑/g, ']').replace(/琢/g, '（').replace(/書/g, '(').replace(/鼬/g, '）').replace(/筆/g, ')').replace(/鼢/g, '%').replace(/Q/g, '.').replace(/頓/g, '、').replace(/賈/g, '+').replace(/撐/g, '*').replace(/癮/g, '"').replace(/線/g, '——').replace(/劃/g, '_').replace(/塗/g, '【').replace(/華/g, '】').replace(/師/g, '{').replace(/廚/g, '/').replace(/藹/g, '@').replace(/學/g, '}').replace(/轉/g, '{').replace(/換/g, '}').replace(/國/g, '-').replace(/攝/g, '℃').replace(/擤/g, '*')
      /*.replace(/壑/g, '&')*/
      .replace(/體/g, '《').replace(/簡/g, '》').replace(/竇/g, '，').replace(/墳/g, '；').replace(/賤/g, '#').replace(/鞫/g, '。') : null;
    });
    return by;
  } catch (e) {
    console.error(val, e);
  }
}

function parse_replaceDefinition(str) {
  if (!str) return;
  str = str.replace(/\b=\b/g, '==');
  str = str.replace(/\<\>/g, '!=');
  str = str.replace(/\./g, 'Q');
  str = str.replace(/\s/g, '');
  return str;
}

async function parse(metricLibraryItemDefinitions, customMetricItems) {
  console.log('-----请求进来了-----', customMetricItems);
  console.log('----metricLibraryItemDefinitions----', metricLibraryItemDefinitions);
  const rets = [];
  metricLibraryItemDefinitions.forEach(function (item) {
    const arrs = [];

    if (item && item.length) {
      item.forEach(function (citem) {
        if (citem.definition) {
          arrs.push({
            conditonType: citem.conditonType,
            conditonValue: citem.conditonValue,
            conditonValueName: citem.conditonValueName,
            deleted: citem.deleted,
            id: citem.id,
            definitionOrder: citem.definitionOrder,
            conditionDefinition: valueParse(parse_replaceDefinition(citem.definition), customMetricItems)
          });
        }
      });
    }

    if (arrs.length) {
      rets.push(arrs);
    }
  });
  return {
    definitions: rets
  };
}
// EXTERNAL MODULE: ./src/assets/css/app.less
var app = __webpack_require__(645);

// CONCATENATED MODULE: ./src/pages/App.js
function App_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class App_App extends _react_16_14_0_reactfrom_dll_reference_dll_vendor["Component"] {
  constructor(props) {
    var _this;

    super(props);
    _this = this;

    App_defineProperty(this, "handleAddMonitor", function () {
      console.log('----向上或向下----', _this.state);
      const {
        defaultExpression
      } = _this.state;

      _this.state.expression.push({
        data: [lodash_default.a.cloneDeep(defaultExpression)],
        conditon_type: '',
        conditon_type_value: '',
        conditon_deviceName: '',
        conditon_deviceName_value: ''
      });

      _this.state.saveExpression.push({
        data: [lodash_default.a.cloneDeep(defaultExpression)],
        conditon_type: '',
        conditon_type_value: '',
        conditon_deviceName: '',
        conditon_deviceName_value: ''
      });

      _this.setState({
        expression: _this.state.expression,
        saveExpression: _this.state.saveExpression
      });
    });

    App_defineProperty(this, "parentHandler", function (expression, saveExpression) {
      _this.setState({
        expression: lodash_default.a.cloneDeep(expression),
        saveExpression: lodash_default.a.cloneDeep(saveExpression)
      });
    });

    App_defineProperty(this, "retExpressionFunc", function () {
      const {
        saveExpression
      } = _this.state;
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
          const {
            data
          } = saveExpression[j];

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
                  definition: data[k] && !data[k].deleted ? data[k] && replaceDefinition(ast2Str(data[k])) : data[k] && data[k].conditionDefinition || ''
                });
              }
            }
          }
        }
      }

      return metricLibraryItemDefinitions;
    });

    App_defineProperty(this, "handleSubmit", function () {
      console.log('----handleSubmit---');
      console.log(_this.state);
      const {
        callbackItemDefinitions
      } = _this.state;

      let expressObj = _this.retExpressionFunc();

      if (expressObj && expressObj.length < 1) {
        lib["Feedback"].toast.show({
          type: 'error',
          content: '表达式必须填写一项'
        });
        return;
      }

      const flag = validatorFunc(expressObj);

      if (!flag) {
        return;
      }

      const callbackItems = callbackItemDefinitions && callbackItemDefinitions.length && callbackItemDefinitions.reduce(function (a, b) {
        return a.concat(b);
      }); // 遍历数组，看新提交的数据 和 返回接口的数据是否相同，不相同说明该数据已经被删除了，需要传给开发

      let newArrs = [];
      expressObj.forEach(function (item) {
        newArrs.push(item.id);
      });

      for (let y = 0; y < callbackItems.length; y++) {
        const yId = callbackItems[y].id;

        if (newArrs.indexOf(yId) === -1) {
          expressObj.push({
            id: yId,
            deleted: new Date().getTime(),
            isAlreadyRemove: true,
            conditonType: callbackItems[y].conditonType,
            conditonValue: callbackItems[y].conditonValue,
            definition: callbackItems[y].definition,
            definitionOrder: callbackItems[y].definitionOrder,
            gmtCreate: callbackItems[y].gmtCreate
          });
        }
      }

      console.log('----expressObj---新返回回来的---', expressObj);
    });

    this.state = {
      expression: [{
        data: [null],
        conditon_type: '',
        conditon_type_value: '',
        conditon_deviceName: '',
        conditon_deviceName_value: ''
      }],
      defaultExpression: null,
      saveExpression: [{
        data: [null],
        conditon_type: '',
        conditon_type_value: '',
        conditon_deviceName: '',
        conditon_deviceName_value: ''
      }],
      // 保存提交数据的表达式
      callbackItemDefinitions: [] // 保存后台返回的数据

    };
  }

  componentDidMount() {
    var _this2 = this;

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
      const metricLibraryItemDefinitions = [[{
        "deleted": 0,
        "conditonType": 2,
        "conditonValue": "2,1,3,4",
        "definitionOrder": 0,
        "conditonValueName": '测试2, 测试1, 测试3, 测试4',
        "definition": "(sum([60002_1002])+avg([60002_1003]))&&(max([60002_1004])-min([60002_1005]))*(sum([60002_1002]))/(avg([60002_1003]))==count([60002_1004])",
        id: 1
      }, {
        "deleted": 0,
        "conditonType": 2,
        "conditonValue": "2,1,3,4",
        "definitionOrder": 1,
        "conditonValueName": '测试2, 测试1, 测试3, 测试4',
        "definition": "((min([60002_1002])+count([60002_1003]))>=(avg([60002_1004])-max([60002_1005])))||(sum([60002_1002])*avg([60002_1003]))!=max([60002_1004])",
        id: 2
      }], [{
        "deleted": 0,
        "conditonType": 2,
        "conditonValue": "1,2",
        "conditonValueName": '测试1,测试2',
        "definitionOrder": 2,
        "definition": "(sum([60002_1002])+max([60002_1003]))<=(avg([60002_1004])-sum([60002_1005]))==count([1122333])",
        id: 3
      }]];

      if (metricLibraryItemDefinitions && metricLibraryItemDefinitions.length) {
        const arrs = [];
        parse(metricLibraryItemDefinitions, customMetricItems).then(function (res) {
          const {
            definitions
          } = res;
          definitions && definitions.length && definitions.forEach(function (item) {
            arrs.push({
              data: item,
              conditon_type_value: item[0].conditonType,
              conditon_deviceName_value: item[0].conditonValue,
              conditon_deviceName: item[0].conditonValueName
            });
          });

          _this2.setState({
            expression: arrs,
            saveExpression: lodash_default.a.cloneDeep(arrs),
            defaultExpression: null,
            callbackItemDefinitions: lodash_default.a.cloneDeep(metricLibraryItemDefinitions)
          });
        });
      }
    }
  } // 新增或操作


  render() {
    const {
      expression,
      saveExpression,
      callbackItemDefinitions
    } = this.state;
    return /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", null, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(_react_dnd_3_0_2_react_dnd_lib["DragDropContextProvider"], {
      backend: _react_dnd_html5_backend_3_0_2_react_dnd_html5_backend_lib_default.a
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", null, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(deviceTypeNodes_MonitorTree, {
      sourceName: "label",
      fromIt: false,
      deviceType: undefined,
      subjectType: undefined
    }), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
      className: "config-context"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      type: "primary",
      className: "new-add-or-btn",
      onClick: this.handleAddMonitor
    }, "\u65B0\u589E\u8868\u8FBE\u5F0F"), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement("div", {
      className: "local-expression"
    }, /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(monitorItemExpression_MonitorItemExpression, {
      expressionItem: expression,
      parentHandler: this.parentHandler,
      saveExpression: saveExpression,
      callbackItemDefinitions: callbackItemDefinitions
    })), /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(lib["Button"], {
      type: "primary",
      onClick: this.handleSubmit,
      style: {
        marginTop: '20px',
        marginLeft: '45%'
      }
    }, "\u4FDD\u5B58")))));
  }

}
// CONCATENATED MODULE: ./src/index.js



_react_dom_16_14_0_react_domfrom_dll_reference_dll_vendor_default.a.render( /*#__PURE__*/_react_16_14_0_reactfrom_dll_reference_dll_vendor_default.a.createElement(App_App, null), document.getElementById('root'));

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(33))(21);

/***/ })

/******/ });
//# sourceMappingURL=app.fa58ceb2.js.map