const babylon = require('babylon');

// 根据节点id找对应的数据
function getParamsById(nodeId, datas) {
  let obj = null; // 保存过滤后的结果
  const getNodeFunc = function(datas) {
    if (datas && datas.length) {
      datas.forEach(node => {
        if (node.customId === nodeId) {
          obj = node;
          return;
        }
        if (node.data) {
          getNodeFunc(node.data);
        }
      });
    }
  }
  if (datas && datas.length) {
    datas.forEach(item => {
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
  let val = value && value.replace(/[\[\]]/g, '').replace(/([0-9]+_*[0-9]*)/g, (v1, v2) => {
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
        return `LABEL$${obj.customName}$${v2}`
      } else {
        return `TEXT$${v2}`
      }
    } else {
      return `TEXT$${v2}`
    }
  }).replace(/([\+\-\*\/\=<>])([0-9]+Q?[0-9]*)/g, (v1, v2, v3) => {
    return `${v2}TEXT$${v3}`
  })
  try {
    val = val.replace(/\[/g, '佐').replace(/\]/g, '佑').replace(/[\（]/g, '琢').replace(/\）/g, '鼬').replace(/\%/g, '鼢')
    .replace(/\s/g, '').replace(/\./g, 'Q').replace(/——/g, '線').replace(/\_/g, '劃').replace(/、/g, '頓')
    .replace(/\【/g, '塗').replace(/\】/g, '華').replace(/\{/g, '師').replace(/\}/, '學').replace(/\{/g, '轉').replace(/\}/, '換')
    .replace(/℃/g, '攝').replace(/《/g, '體').replace(/》/g, '簡').replace(/，/g, '竇').replace(/；/g, '墳').replace(/#/g, '賤')
    .replace(/。/g, '鞫')/*.replace(/&/g, '壑')*/.replace(/"/g, '癮').replace(/@/g, '藹');
    const by = babylon.parse(val);
    by.tokens.map(o => {
      o.value = o.value ? o.value.toString().replace(/佐/g, '[').replace(/佑/g, ']').replace(/琢/g, '（').replace(/書/g, '(').replace(/鼬/g, '）')
      .replace(/筆/g, ')').replace(/鼢/g, '%').replace(/Q/g, '.').replace(/頓/g, '、').replace(/賈/g, '+').replace(/撐/g, '*').replace(/癮/g, '"')
      .replace(/線/g, '——').replace(/劃/g, '_').replace(/塗/g, '【').replace(/華/g, '】').replace(/師/g, '{').replace(/廚/g, '/').replace(/藹/g, '@')
      .replace(/學/g, '}').replace(/轉/g, '{').replace(/換/g, '}').replace(/國/g, '-').replace(/攝/g, '℃').replace(/擤/g, '*')/*.replace(/壑/g, '&')*/
      .replace(/體/g, '《').replace(/簡/g, '》').replace(/竇/g, '，').replace(/墳/g, '；').replace(/賤/g, '#').replace(/鞫/g, '。'): null;
    });
    return by;
  } catch (e) {
    console.error(val, e)
  }
}

function replaceDefinition(str) {
  if (!str) return;
  str = str.replace(/\b=\b/g, '==')
  str = str.replace(/\<\>/g, '!=')
  str = str.replace(/\./g, 'Q')
  str = str.replace(/\s/g, '')
  return str
}
export default async function parse(metricLibraryItemDefinitions, customMetricItems) {
  console.log('-----请求进来了-----', customMetricItems);
  console.log('----metricLibraryItemDefinitions----', metricLibraryItemDefinitions);
  const rets = [];
  metricLibraryItemDefinitions.forEach(item => {
    const arrs = [];
    if (item && item.length) {
      item.forEach(citem => {
        if (citem.definition) {
          arrs.push({
            conditonType: citem.conditonType,
            conditonValue: citem.conditonValue,
            conditonValueName: citem.conditonValueName,
            deleted: citem.deleted,
            id: citem.id,
            definitionOrder: citem.definitionOrder,
            conditionDefinition: valueParse(replaceDefinition(citem.definition), customMetricItems),
          });
        }
      });
    }
    if (arrs.length) {
      rets.push(arrs);
    }
  });
  return {
    definitions: rets,
  }
}