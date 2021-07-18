import { Feedback } from '@alife/aisc';

export function $generate(ast) {
  if (!ast || !ast.tokens) return '';
  let t = ast.tokens && ast.tokens.map(o => {
    if (o.type.label === 'eof') return '';
    return o.value || o.type.label
  }).join('')
  return t;
}

export function ast2Str(ast) {
  if (!ast) return '';
  if (ast.conditionDefinition) {
    ast = ast.conditionDefinition;
  }
  let t = ast.tokens && ast.tokens.map(o => {
    if (o.type.label === 'eof') return ''
    if (o.value) {
      if (/LABEL\$(.*)\$[0-9_]/.test(o.value)) {
        return o.value.split('$')[2];
      } else if (/TEXT\$(.*)/.test(o.value)) {
        return o.value.split('$')[1];
      } else {
        return o.value;
      }
    }
    return o.type.label
  }).join('');
  if (/(\(\S*-\S*\))/.test(t)) {
    t = t.replace(/LABEL\$\S*\$/, '')
  }
  return t
}

export function replaceDefinition(str) {
  if (!str) return;
  str = str.replace(/[\[\]]/g, '')
  str = str.replace(/([a-z]*)\(([^()]*)\)/g, '$1([$2])')
  str = str.replace(/Q/g, '.')
  return str
}

// 特殊字符转换成繁体字
export function charToChinese(currentCode) {
  return currentCode.replace(/\[/g, '佐').replace(/\]/g, '佑').replace(/\（/g, '琢').replace(/\）/g, '鼬')
  .replace(/\%/g, '鼢').replace(/\s/g, '').replace(/——/g, '線').replace(/\_/g, '劃').replace(/\【/g, '塗').replace(/\】/g, '華')
  .replace(/\{/g, '師').replace(/\}/, '學').replace(/\{/g, '轉').replace(/\}/, '換').replace(/℃/g, '攝')
  .replace(/、/g, '頓').replace(/《/g, '體').replace(/》/g, '簡').replace(/，/g, '竇').replace(/；/g, '墳').replace(/#/g, '賤')
  .replace(/。/g, '鞫').replace(/&/g, '壑').replace(/"/g, '癮').replace(/@/g, '藹');
}

// 繁体字转换成特殊字符

export function chineseToChar(currentCode) {
  return currentCode.replace(/佐/g, '[').replace(/佑/g, ']').replace(/琢/g, '（').replace(/書/g, '(')
  .replace(/鼬/g, '）').replace(/鼢/g, '%').replace(/筆/g, ')').replace(/頓/g, '、').replace(/賈/g, '+').replace(/撐/g, '*')
  .replace(/線/g, '——').replace(/劃/g, '_').replace(/塗/g, '【').replace(/華/g, '】').replace(/師/g, '{').replace(/廚/g, '/')
  .replace(/學/g, '}').replace(/轉/g, '{').replace(/換/g, '}').replace(/國/g, '-').replace(/攝/g, '℃').replace(/撐/g, '*')
  .replace(/體/g, '《').replace(/簡/g, '》').replace(/竇/g, '，').replace(/墳/g, '；').replace(/賤/g, '#').replace(/鞫/g, '。')
  .replace(/壑/g, '&').replace(/癮/g, '"').replace(/藹/g, '@');
}

export function validatorData(data) {
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
}

// 获取url后的参数
export function getUrlParams(param) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if(pair[0] == param) {
      return pair[1];
    }
  }
  return false;
}

export function validatorFunc(expressObj) {
  const isStr = function(str) {
    return Object.prototype.toString.call(str)=="[object String]"
  };
  if (expressObj && expressObj.length) {
    for (let k = 0, klen = expressObj.length; k < klen; k++) {
      const cItem = expressObj[k];
      if (!expressObj[k].isAlreadyRemove) {
        const conditionDefinition = cItem.conditionDefinition || cItem.definition;
        if (isStr(conditionDefinition)) {
          if (conditionDefinition.indexOf('R$x') > -1 ||
          conditionDefinition.indexOf('BLANK$') > -1 || 
          conditionDefinition.indexOf('L$sum') > -1 || 
          conditionDefinition.indexOf('L$avg') > -1 || 
          conditionDefinition.indexOf('L$max') > -1 || 
          conditionDefinition.indexOf('L$min') > -1 || 
          conditionDefinition.indexOf('L$count') > -1 || 
            validatorData(conditionDefinition)
          ) {
            Feedback.toast.show({
              type: 'error',
              content: '判断条件请填写完整'
            });
            return;
          }
        } else {
          Feedback.toast.show({
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
                Feedback.toast.show({
                  type: 'error',
                  content: '关联项请填写完整'
                })
                return;
              }
              if (curItem.conditonType === 2) {
                if (curItem.conditonValue === '') {
                  Feedback.toast.show({
                    type: 'error',
                    content: '关联项的值请填写完整'
                  })
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



