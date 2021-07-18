
import React, { Component } from 'react';
import Target from '@components/target';
import ConnectDropTarget from '@components/connectDropTarget';
import Container from '@components/container';
import ContentEditable from '@components/contentEditable';
import { Balloon } from '@alife/aisc';
import _, { endsWith } from 'lodash';

const DropTarget = function (props) {
  // primaryKey 用来关联可拖拽项，丢失可导致无法推拽的问题
  let P = ConnectDropTarget(Target, props.primaryKey)
  return <P {...props}>{props.children}</P>
}

export default class BaseExp extends Component {
  constructor(props) {
    super(props)
  }
  handleChange = (start, end) => (val, component) => {
    const { index, subIndex } = this.props;
    this.props.onChange(val, component, start, end, index, subIndex)
  }
  handleTextChange = (start, end) => (e, val) => {
    const { index, subIndex } = this.props;
    this.props.onChange(val, null, start, end, index, subIndex)
  }
  removeItem(item, value, parentIndex, subIndex) {
    const chars = ['+', '-', '*', '/', '==', '!=', '>=', '<=', '>', '<', '&&', '||'];
    const logicArrs = ['sum', 'avg', 'max', 'min', 'count', 'R$x', 'A$x', 'LABEL'];
    const logicChars = ['sum', 'avg', 'max', 'min', 'count']; 
    const curValue = item.value;
    const { start, end } = item;
    const { tokens } = value;

    /*
     * 重新设置tokens中的start和end的值
     * 当删除元素后，需要重新设置 start 和 end 的值
     * 解决方法: 遍历数组。如果是 null值，如果是的话，那么start 和 end 值相差1，
     * 否则的话，那么end的长度就等于 start 的长度 + value.length;
    */
   const setStartAndEndValue = function () {
    if (tokens.length > 0) {
      for (let i = 0; i < tokens.length; i++) {
        const { value } = tokens[i];
        if (i === 0) {
          if (value === null) {
            tokens[0].start = 0;
            tokens[0].end = 1;
          } else {
            tokens[0].start = 0;
            tokens[0].end = tokens[0].start + tokens[0].value.length;
          }
        } else {
          // 如果不是第一个元素，
          // 如果值是null
          if (value === null) {
            // 1. 获取该元素的上一个元素的end值当作该元素的start值
            // 2. end 值 在当前元素的start值加1
            const prevIndex = i - 1;
            tokens[i].start = tokens[prevIndex].end;
            tokens[i].end = tokens[i].start + 1;
          } else {
            // 如果值不等于null的话
            // 1. 获取该元素的上一个元素的end值当作该元素的start值
            // 2. end 值 在当前元素的start值 + 当前字符串的长度
            const prevIndex = i - 1;
            tokens[i].start = tokens[prevIndex].end;
            tokens[i].end = tokens[i].start + tokens[i].value.length;
          }
        }
      }
    }
   };
   // 从当前被删除元素开始查找上一个运算符的位置
   const getPrevCharPos = function(curElemIndex) {
     const { value } = tokens[curElemIndex];
     if (chars.indexOf(value) > -1) {
       return curElemIndex;
     }
     if (curElemIndex - 1 >= 0) {
       return getPrevCharPos(curElemIndex - 1);
     }
     return -1;
   };
   // 获取下一个运算符的位置
   const getNextCharPos = function(curElemIndex) {
     const { value } = tokens[curElemIndex];
     if (chars.indexOf(value) > -1) {
       return curElemIndex;
     }
     if (curElemIndex < tokens.length -1) {
       return getNextCharPos(curElemIndex + 1);
     }
     return -1;
   };
    /*
     * 获取左括号的索引
     * 首先在当前元素位置下，使用递归方式，依次向上逐个元素查找是否有 左括号，如果有的话，返回左括号所在位置，否则返回-1
    */
    const getLeftParenthesisIndex = function(curElemIndex) {
      /*
       * 判断当前的值是否是左边小括号，判断规则：1) 判断该值是否等于null，且 该项的end值 - start 值 是否等于1，2）判断该项 type.label = '('
       * 除了上面条件以外，还需要考虑逻辑运算符的存在，比如上个运算符是否有 sum()/avg()/max()/min()/count() 这些外
       */
      const func = function(curElemIndex) {
        const { value, start, end, type } = tokens[curElemIndex];
        if (value === null && (end - start === 1) && (type.label === '(')) {
          // 还需要过滤掉 逻辑运算符的左边小括号
          let flag = false;
          if (curElemIndex - 1 >= 0) {
            const { value } = tokens[curElemIndex - 1];
            flag = (value === 'sum') || (value === 'max') || (value === 'min') || (value === 'count') || (value === 'avg') ? true : false;
          }
          if (!flag) {
            return curElemIndex;
          } else {
            if (curElemIndex > 0) {
              const index = curElemIndex - 1;
              return func(index);
            } else {
              return -1;
            }
          }
        } else {
          if (curElemIndex > 0) {
            const index = curElemIndex - 1;
            return func(index);
          } else {
            return -1;
          }
        }
      };
      return func(curElemIndex);
    };
    // 获取右括号的索引
    const getRightParenthesisIndex = function(curElemIndex) {
      /*
       * 除了下面这些条件外，我们还需要考虑逻辑运算符 sum()/max()/min()/avg()/count() 这些。
      */
      const func = function(curElemIndex) {
        // 获取当前被删除元素的 value/start/end/type 
        const { value, start, end, type } = tokens[curElemIndex];
        if (value === null && (end - start === 1) && (type.label === ')')) {
          // 还需要过滤掉逻辑运算符右边的小括号
          let flag = false;
          if (curElemIndex - 3 > 0) { // 判断前3个元素的值是否是逻辑运算符
            const { value } = tokens[curElemIndex - 3];
            flag = (value === 'sum') || (value === 'max') || (value === 'min') || (value === 'count') || (value === 'avg') ? true : false;
          }
          if (!flag) {
            return curElemIndex;
          } else {
            if (curElemIndex < tokens.length - 1) {
              const index = curElemIndex + 1;
              return func(index);
            } else {
              return -1;
            }
          }
        }
        if (curElemIndex < tokens.length - 1) {
          const index = curElemIndex + 1;
          return func(index);
        } else {
          return -1;
        }
      };
      return func(curElemIndex);
    };
    /**
     * 是否有运算符
     * @param { index } curElemIndex 当前被删除元素的索引 
     * @param { String } dir 方向，代表是向上查找 还是 向下查找
     */
    const isHasChar = function(curElemIndex, newArrs, dir) {
      console.log('----newArrs----', newArrs);
      console.log('------curElemIndex----', curElemIndex);
      if (curElemIndex > newArrs.length - 1) {
        return false;
      }
      const { value } = newArrs[curElemIndex];
      if (chars.indexOf(value) > -1) {
        return true;
      }
      if (dir === 'prev' && (curElemIndex === 0)) {
        return false;
      }
      if (dir === 'next' && (curElemIndex === newArrs.length -1)) {
        return false;
      }
      if (dir === 'prev' && (curElemIndex > 0)) {  // 向上查找---使用递归方式
        return isHasChar(curElemIndex - 1, newArrs, dir);
      } else {
        if (curElemIndex < newArrs.length - 1) {
          return isHasChar(curElemIndex + 1, newArrs, dir);
        }
      }
      return false;
    };
    /**
     * 判断当前被删除元素中的左边括号是否和右边括号是否相同。((max(___)) - (min(___))) 这样的
     * 1）获取上/下一个运算符的的索引位置，向下/向上递归，获取左括号/右括号的数量
     * 2）判断两者是否相等
     * @param { Number } curElemIndex 当前被删除元素的索引
     * @param { String } dir 当前的方向。如果 dir === 'prev' 是从上逐渐遍历搜索，dir === 'next' 是从下逐渐遍历搜索
     * @return { Object } { leftCount, rightCount } 左括号的数量 / 右括号的数量
    */
    const getLeftAndRightCount = function(curElemIndex, dir) {
      
      let leftCount = 0; // 左边括号的数量
      let rightCount = 0; // 右边括号的数量

      // 使用递归的方式 向上/向下查找
      const func = function(curElemIndex, dir) {
        const { value, start, end, type } = tokens[curElemIndex];

        if (value === null && (end - start === 1) && (type.label === ')')) {
          let flag = false;
          if (curElemIndex - 3 > 0) { // 判断前3个元素的值是否是逻辑运算符
            const { value } = tokens[curElemIndex - 3];
            flag = (value === 'sum') || (value === 'max') || (value === 'min') || (value === 'count') || (value === 'avg') ? true : false;
          }
          if (!flag) {
            rightCount++;
          }
        }

        if (value === null && (end - start === 1) && (type.label === '(')) {
          let flag = false;
          if (curElemIndex - 1 > 0) { // 判断前一个元素的值是否是逻辑运算符
            const { value } = tokens[curElemIndex - 1];
            flag = (value === 'sum') || (value === 'max') || (value === 'min') || (value === 'count') || (value === 'avg') ? true : false;
          }
          if (!flag) {
            leftCount++;
          }
        }
        if (dir === 'prev') {
          if (curElemIndex > 0) {
            const index = curElemIndex - 1;
            return func(index, dir);
          }
        } else if (dir === 'next') {
          if (curElemIndex < tokens.length - 1) {
            const index = curElemIndex + 1;
            return func(index, dir);
          }
        }
        console.log('------leftCount-----', leftCount);
        console.log('-------rightCount----', rightCount);
        return {
          leftCount,
          rightCount
        };
      };
      /*
        ((max(__)) - (min(__))) 
        1. 如果我删除max项，因此我需要获取 下个运算符的位置，然后 往上逐渐查找 左右括号数量是否相同。
        2. 如果我删除min项，我需要获取上个运算符的位置，然后逐渐往下查找 左右括号数量是否相同。
      */
      if (dir === 'prev') { // 向上查找, 应该获取下一个运算符的索引，从下一个运算符的位置开始逐渐向上递归查找
        const nextCharIndex = getNextCharPos(curElemIndex); // 保存下一个运算符的索引
        return func(nextCharIndex, dir);
      } else if (dir === 'next') { // 向下查找 应该获取上一个运算符的索引，从上一个运算符位置开始逐渐向下递归查找
        const prevCharIndex = getPrevCharIndex(curElemIndex); // 保存上一个运算符的索引
        return func(prevCharIndex, dir);
      } else {
        console.log('---------参赛传递有误，需要传入第二个参数方向----');
      }
    };
    /*
     * 获取元素的是否是 首元素/中间元素/尾部元素
     * 判断规则，在当前元素中使用递归方式，向上查找运算符，如果没有找到，说明是首元素。如果向上找到运算符，且向下也找到运算符，说明是中间元素。
     * 否则的话，就是尾部元素了。
     * @param { Number } curElemIndex 当前被删除元素的索引
     * @param { Array } newArrs 在某块范围内查找
     * @return { Number } index 返回值有 0/1/2/3, 如果等于0的话，说明是首元素，如果等于1的话，说明是中间元素，如果等于2的话，说明是尾部元素,
     * 如果等于3的话，说明是最后一个元素
    */
    const getElemPos = function(curElemIndex, newArrs) {

      const isPrevChar = isHasChar(curElemIndex, newArrs, 'prev');
      const isNextChar = isHasChar(curElemIndex, newArrs, 'next');
      console.log('----isPrevChar----', isPrevChar);
      console.log('----isNextChar---', isNextChar);

      if (isPrevChar && isNextChar) { // 说明是中间元素 
        return 1;
      } else if (!isPrevChar && isNextChar) { // 说明是首元素
        return 0;
      } else if (isPrevChar && !isNextChar){ // 说明是尾部元素
        return 2;
      } else if (!isPrevChar && !isNextChar) { // 说明是最后一个元素
        return 3;
      }
    };
    // 获取在数组内下一个运算符的位置索引
    const getNextCharIndex = function(curElemIndex) {
      let count = 0; // 计时器
      // 点击某个元素时候，获取该值，如果该值是逻辑运算符的话，那么设置该变量为true
      let isLogic = false;
      if (curElemIndex - 3 > 0) { // 为什么减去3呢？因为 sum() 这样的 当是右边括号时候，判断sum的位置就是前面3个
        const { value } = tokens[curElemIndex - 3];
        for (let k = 0; k <= logicChars.length - 1; k++) {
          if (logicChars[k].indexOf(value) > -1) {
            isLogic = true;
            break;
          }
        }
      }
      const func = function(curElemIndex) {
        // 还是一样，使用递归的方式 向下查找对应的最近的运算符
        const { value, start, end, type } = tokens[curElemIndex];
        if (value === null && (end - start === 1) && (type.label === '(')) {
          if (!isLogic) {
            count++;
          }
        }
        const flag = chars.some(item => {
          return item.indexOf(value) > -1;
        });
        if (flag) {
          return curElemIndex - count;
        } else {
          if (curElemIndex < tokens.length - 1) {
            return getNextCharIndex(curElemIndex + 1);
          }
        }
        return -1;
      }
      return func(curElemIndex);
    };
    // 获取在数组内上一个运算符的位置索引
    const getPrevCharIndex = function(curElemIndex) {
      let count = 0; // 计时器
      var prevFlag = true;
      const func = function(curElemIndex) {
        const { value, start, end, type } = tokens[curElemIndex];
        // 向上递归，如果中间碰到 左括号的话，那么计数器就加1，但是要过滤掉逻辑运算符中的 左括号
        if (curElemIndex - 1 > 0) {
          const prevValue = tokens[curElemIndex - 1].value;
          prevFlag = logicChars.indexOf(prevValue) > -1 ? false : true;
        }
        if (value === null && (end - start === 1) && (type.label === '(') && prevFlag) {
          count++;
        }
        const flag = chars.some(item => {
          return item.indexOf(value) > -1;
        });
        if (flag) {
          return curElemIndex + count;
        } else {
          if (curElemIndex - 1 >= 0) {
            return getPrevCharIndex(curElemIndex - 1);
          }
        }
        return -1;
      };
      return func(curElemIndex);
    };
    const deleteValue = function(curElemIndex) {
      const leftIndex = getLeftParenthesisIndex(curElemIndex);
      const rightIndex = getRightParenthesisIndex(curElemIndex);
      if (leftIndex > -1 && rightIndex > -1) { // 说明当前元素在小括号范围内
        // 1) 获取小括号的所有元素 rightIndex + 1 是因为包括最后一个右边小括号
        let newArrs = tokens.slice(leftIndex, rightIndex + 1);

        // 2）判断小括号内的当前被删除的元素是 首元素/中间元素/尾部元素
        const curElemPos = getElemPos(curElemIndex, tokens);
        let startPos = 0; // 保存开始位置索引
        let endPos = 0; // 保存结束位置索引

        if (curElemPos === 0) { // 首元素
         /*
           如果是首元素的话，同样需要判断几种情况，第一种是 (__) + __; 第二种是 (__ + ___) + ___, 第三种是：((___)) + ___
           第四种情况是：((max(__)) - (min(__))) 
           1）对于第一种情况下，删除数据的时候，startPos = leftIndex; 
           2）对于第二种情况下，如果在小括号内，不止一个元素的话，那么我们就不能把前面的小括号删除掉，因此需要从 leftIndex + 1 开始。
           所以我们需要判断在 小括号范围内 当前元素的下一个元素是否有运算符，如果有的话，就是第二种情况，否则的话，就是第一种情况。
         */
          const isNextChar = isHasChar(curElemIndex, newArrs, 'next'); // 在当前小括号中查找下一个运算符
          const isNextChar2 = isHasChar(curElemIndex, tokens, 'next'); // 在tokens数组中查找下一个运算符，针对的是第三种情况
          if (isNextChar) {
            startPos = leftIndex + 1;
          } else {
            if (isNextChar2) {
              // 这里还需要判断 下一个运算符之前的右括号的数量 是否 和 左边的左括号数量是否相等，如果不想等的话，说明后面还有运算操作
              const rets = getLeftAndRightCount(curElemIndex, 'prev');
              const { leftCount, rightCount } = rets;
              if (leftCount === rightCount) { // 如果左边和右边括号相同的话，说明后面没有内容，是一个整体，可以把整体一起删除掉
                startPos = 0;
              } else if (leftCount > rightCount) {
                startPos = leftCount - rightCount;
              }
            } else {
              startPos = leftIndex;
            }
          }
          // 结束位置判断方法：从 newArrs 数组内查找，从当前 索引 curElemIndex 查找下一个运算符的位置
          endPos = getNextCharIndex(curElemIndex) + 1; // 因为要把下个运算符删除掉，所以加1
          tokens.splice(startPos, endPos - startPos); // 截取掉tokens值
        } else if (curElemPos === 1) { // 中间元素
          /*
           * 这里的中间元素，指在tokens数组中 有上个运算符 和 下个运算符，那么也分为几种情况。
           * 比如说 第一种 1）___ + (___ + ___ - ___) 当我删除小括号中 第一个元素或第二个元素的话，他也是中间元素
           * 第二种 2) ___ + (___) + ___  当我删除小括号的话，它也属于中间元素。
           * 因此针对这几种情况，我们也需要判断下
           * 1）如果在小括号范围之内，没有上个运算符，有下个运算符，说明是在小括号中是首元素。
           * 2）如果在小括号范围之内，有上个运算符，也有下个运算符，说明是中间元素。
           * 3）如果在小括号范围内，没有上个运算符，也没有下个运算符，类似第二种情况，因此我们需要把整个小括号删除掉，并且把前面的运算符也删除掉。
           * 针对上面几种情况，我们需要做如下处理：
           * 1）针对小括号中 首元素，我们只需要把 首元素 和 后面的运算符一起删除掉。
           * 2）针对小括号的中间元素，我们需要中 中间元素 和 前面的运算符一起删除掉。
           * 3）针对第三种情况，我们需要把 小括号的所有删除掉，且需要把前面的运算符也删除掉
          */
          
          // 1）首先我们需要判断的是，在小括号中，当前元素是否有上个运算符 / 下个运算符
          const isPrevChar = isHasChar(curElemIndex - leftIndex, newArrs, 'prev');
          const isNextChar = isHasChar(curElemIndex - leftIndex, newArrs, 'next');
          if (!isPrevChar && isNextChar) { // 小括号中的首元素
            startPos = leftIndex + 1; // 从小括号中第一个字符截取, 所以加1
            endPos = getNextCharIndex(curElemIndex) + 1; // 因为要把下个运算符删除掉，所以加1
            tokens.splice(startPos, endPos - startPos);

          } else if (isPrevChar && isNextChar) { // 小括号中的中间元素
            startPos = getPrevCharIndex(curElemIndex); // 从上个运算符索引开始删除
            /*
             * 获取结束位置，也要分为两种情况，第一种是正常内容，第二种是带有逻辑表达式的，比如 __+ sum(__) + __ 这样的， 
             * 当我删除逻辑表达式时，因为逻辑表达式后面还有一个小括号，需要把小括号算上。
             * 否则的话，就是当前被删除的索引 curElemIndex + 1; 
            */
            const { value } = tokens[curElemIndex];
            const flag = (value === 'L$sum') || (value === 'L$max') || (value === 'L$min') || (value === 'L$count') || (value === 'L$avg') ? true : false; 
            if (flag) {
              // endPos = getNextCharIndex(curElemIndex) + 1; // 因为逻辑运算符还有右边的小括号
              endPos = getNextCharIndex(curElemIndex); // // 获取下个运算符的索引当作结束位置
              tokens.splice(startPos, endPos - startPos); // 把当前被删除的索引 - 上个运算符索引
            } else {
              endPos = getNextCharIndex(curElemIndex); // 获取当前的索引
              tokens.splice(startPos, endPos - startPos); // 下个运算符索引 - 上个运算符索引
            }
          } else if (isPrevChar && !isNextChar) { // 小括号的尾部元素
            // 有上个运算符，没有下个运算符，说明元素在小括号尾部
            // 1）获取上个运算符的位置，从上个运算符位置开始删除元素
            startPos = getPrevCharIndex(curElemIndex);
            // 2）获取右边小括号的位置，
            endPos = getRightParenthesisIndex(curElemIndex);

            tokens.splice(startPos, endPos - startPos);

          } else if (!isPrevChar && !isNextChar) { // 针对第二种情况
            /*
             * 这里也要考虑两种情况，比如上个字符不是运算符的话，那么我不能把上个字符删除掉了。比如 __ + ((__)+(__)) 多个嵌套小括号的。
             * 第二种情况小括号前面 上个字符是运算符的话，那么我们需要把它删除掉
            */
            const { value } = tokens[leftIndex - 1];
            const flag = chars.some(item => {
              return item.indexOf(value) > -1;
            });
            if (!flag) {
              startPos = leftIndex; // 前面不是运算符的话，不减去1
              endPos = getNextCharIndex(curElemIndex) + 1 - startPos;
              tokens.splice(startPos, endPos); 
            } else {
              startPos = getPrevCharIndex(curElemIndex); // 获取上个运算符的索引
              endPos = rightIndex;
              tokens.splice(startPos, endPos - startPos + 1); 
            }
          }
        } else if (curElemPos === 2) { // 如果是小括号中尾部元素

          startPos = getPrevCharIndex(curElemIndex);
          /*
           * 1）从尾部删除掉
           * 如果是小括号中尾部元素，又分为两种情况
           * 第一种是： __ + (__ + ___)
           * 第二种是： __ + (___)
           * 第三种就是 count这种 count 逻辑表达式允许：count(___ / (___)) 
           * 如果对于第一种的话，当我删除括号中最后一个元素的时候，我们需要把 + 运算符 和 最后那个元素一起删除掉，因此我们这边需要判断该删除
           * 的元素前面是否有运算符，如果有运算符的话，说明是删除小括号中的最后一个字符。否则的话，就是第二种情况，把整个小括号内容删除掉，并且还需要
           * 把前面的运算符 + 号删除掉。
           * curElemIndex - leftIndex 的含义是，首先 newArrs 这个数组是从 小括号中 左括号 到 右括号 截取的数据。但是左小括号前面还有很多表达式的，
           * curElemIndex的索引是从tokens数组里面的索引的，因此我们需要减掉 前面的表达式索引，前面有多少个表达式，可以根据左括号的索引判断，所以减去
           * 左括号的索引即可得到正确的索引
          */
          const isPrevChar = isHasChar(curElemIndex - leftIndex, newArrs, 'prev');

          // 在tokens数组中查找上一个运算符，针对的是第三种情况, 
          // 当我删除 count(___ / (___))  最后一个元素的时候，我需要在tokens判断是否有运算符
          const isPrevChar2 = isHasChar(curElemIndex , tokens, 'prev');
          if (isPrevChar) {
            endPos = rightIndex;
            // tokens.splice(startPos, endPos - startPos + 1); 
            tokens.splice(startPos, endPos - startPos); 
          } else {
            if (isPrevChar2) {
              // 获取下个小括号的索引
              endPos = rightIndex -startPos + 1; // 因为要加上前面的运算符
              tokens.splice(startPos, endPos);
            } else {
              tokens.splice(startPos);
            }
          }
         
        } else if (curElemPos === 3) { // 最后一个元素
          startPos = 0;
          tokens.splice(startPos);
        }
      } else { // 说明当前元素不在小括号范围内
        let startPos = 0; // 保存开始位置索引
        let endPos = 0; // 保存结束位置索引
        // 是否有 count 字符
        const isHasCount = function() {
          let flag = false;
          for (let i = 0; i < tokens.length; i++) {
            const { value } = tokens[i];
            if (value === 'count') {
              flag = true;
              break;
            }
          }
          return flag;
        };
        // 判断当前被删除的元素是 首元素/中间元素/尾部元素
        const curElemPos = getElemPos(curElemIndex, tokens);
        if (curElemPos === 0) { // 首元素
          // 这里一样要判断是否有count 比如 像 count(__ / ___) + ___ 这种 删除count的第一个元素的话，需要处理
          const flag = isHasCount();
          if (flag) {
            if (curElemIndex + 1 <= tokens.length - 1) {
              const val = tokens[curElemIndex + 1].value;
              if (chars.indexOf(val) > -1) { // 说明有下一个运算符
                startPos = curElemIndex;
                endPos = getNextCharIndex(curElemIndex) + 1;
                tokens.splice(startPos, endPos - startPos);
              } else {
                // 如果是首元素的话，我需要删除 从 0 开始，到下个运算符结束位置，包括运算符索引
                startPos = 0;
                endPos = getNextCharIndex(curElemIndex) + 1;
                tokens.splice(startPos, endPos);
              }
            }
          } else {
            // 如果是首元素的话，我需要删除 从 0 开始，到下个运算符结束位置，包括运算符索引
            startPos = 0;
            endPos = getNextCharIndex(curElemIndex) + 1;
            tokens.splice(startPos, endPos);
          }
          
        } else if (curElemPos === 1 || curElemPos === 2) { // 中间元素 或 尾部元素
          // 如果是 中间元素 或 尾部元素 则需要删除上一个运算符 加 当前的元素
          startPos = getPrevCharIndex(curElemIndex);
          endPos = getNextCharIndex(curElemIndex);
          if (endPos === -1) {
            // 这里还需要判断 像 count(__ / ___) 这种，如果我删除最后一个的话，就不需要把最后小括号删除掉
            // 这里我们还需要判断前面有没有运算符，如果前面有运算符的话，我们只需要截取掉 运算符 + 被删除的元素即可
            const val = tokens[curElemIndex].value;
            const flag = isHasCount();
            if (val !== 'L$count' && flag) {
              endPos = curElemIndex - startPos + 1; // 因为需要把前面运算符一起删除，因此加1
              tokens.splice(startPos, endPos);
            } else {
              tokens.splice(startPos); // 截取掉tokens值
            }
          } else {
            // 这里还需要判断一种情况，比如 count(__/___); 当我删除运算符最后一个元素的时候，只需要把 / 运算符 和 元素删除即可
            // 我只需要判断当前元素的前一个元素是否有运算符，如果有运算符的话，删除运算符 和 当前元素即可
            let flag = isHasChar(curElemIndex, tokens, 'prev');
            if (flag) {
              endPos = curElemIndex - startPos + 1; // 因为后面还需要加上运算符
              tokens.splice(startPos, endPos);
            } else {
              tokens.splice(startPos, endPos - startPos); // 截取掉tokens值
            }
          }
        } else if (curElemPos === 3) { // 最后元素
          startPos = 0;
          endPos = tokens.length;
          tokens.splice(startPos, endPos); // 截取掉tokens值
        }
      }
    };

    tokens.forEach((element, index) => {
      if ((element.value === curValue) && (element.start === start) && (element.end === end)) {
        // tokens.splice(index, 1);
        // 下面是针对类似这种情况的 sum(xxx === yyy) 这样的
        // 当前元素的上一个元素 比如 删掉 yyy, 那么上一个元素 === 也要被删除
        deleteValue(index);
      }
    });
    // 重新设置tokens中的start和end的value
    setStartAndEndValue(tokens);

    console.log('----xxxx----tokens---', tokens);
    console.log('---this.props.expressionItem---', this.props.expressionItem);
    console.log('----value----', value);

    if (tokens.length === 0) {
      this.props.expressionItem[parentIndex].data[subIndex] = null;
    }
    this.props.onHandler && this.props.onHandler(this.props.expressionItem);
  }
  render() {
    const { value, allow, index, subIndex } = this.props;
    if (!value) return null
    const { tokens } = value;

    return <div className="exp-context">
      {
        tokens && tokens.map(o => {
          if (o.type.label === 'eof') {
            return
          }
          console.log('-------o.value-----', o.value);
          let val = o.value && o.value.toString()
          if (/^[A-Z]+\$/.test(val)) {
            let temp = null
            let splits = o.value.split('$')
            let type = splits[0]
            let key = splits[1]

            switch (type) {
              case 'BLANK':
                temp = <DropTarget empty primaryKey={['root', 'label', 'blank', 'relationExp', 'text']}>
                  <Container className="exp-container" onChange={this.handleChange(o.start, o.end)} />
                </DropTarget>
                break
              case 'A':
                temp = <DropTarget empty primaryKey={['root', 'label', 'blank', 'relationExp', 'text']}>
                  <Container className="exp-container" onChange={this.handleChange(o.start, o.end)} />
                </DropTarget>
                break
              case 'R':
                temp = <DropTarget empty primaryKey={['root', 'label', 'blank', 'relationExp', 'text']}>
                  <Container className="exp-container" onChange={this.handleChange(o.start, o.end)} />
                </DropTarget>
                break
              case 'L':
                if (key === 'count') {
                  temp = <DropTarget empty allow={allow} primaryKey={['relationExp', 'label', 'blank', 'text', 'root']}>
                    <Container className="exp-container" onChange={this.handleChange(o.start, o.end)} />
                  </DropTarget>
                  break
                }
                temp = <DropTarget primaryKey="label" allow={allow}>
                  <Container className="exp-container" onChange={this.handleChange(o.start, o.end)} />
                </DropTarget>
                break
              case 'LABEL':
                temp = <DropTarget primaryKey="label">
                  <Container className="exp-container" value={key} onChange={this.handleChange(o.start, o.end)} />
                </DropTarget>
                break
              case 'TEXT':
                temp = <ContentEditable type="number" content={key.replace(/Q/, '.')} placeholder="值" onBlur={this.handleTextChange(o.start, o.end)} className="exp-container small" />
                break
            }
            const triggerElem1 = <span className="exp-tag" data-start={o.start} data-end={o.end}>{temp}</span>
            return <Balloon closable={false} triggerType="hover" trigger={triggerElem1} align="t"><a onClick={this.removeItem.bind(this, o, value, index, subIndex)} href="javascript:void(0)">删除</a></Balloon>
          }
          return <span data-start={o.start} data-end={o.end}>{o.value || o.type.label}</span>
        })
      }
    </div>
  }
}