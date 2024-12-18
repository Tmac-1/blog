
/*
 1.使用es6扩展运算符实现  
  一：some()语法：
  array.some(function(item,index,array){                    
     //item:当前元素的值；                    
     //index:当前元素的索引；
     // array:当前元素的数组对象；                 
  })

some()方法会依次执行数组的每个元素；
如果有一个元素满足条件，则表达式返回true，剩余的元素不会再执行检测。如果没有满足条件的元素，则返回false
注意：some()不会对空数组进行检测； some()不会改变原始数组；

语法：
array.every(function(item,index,array）{              
      //item:当前元素的值；                    
      //index:当前元素的索引；
      // array:当前元素的数组对象；             
}
every()方法使用指定函数检测数组中的所有元素；
如果数组中检测到有一个元素不满足，则整个表达式返回false，且剩余的元素不会再进行检测。如果所有元素都满足条件，则返回true；
注意：every()不会对空数组进行检测； every()不会改变原来的数组

https://blog.csdn.net/a_keri/article/details/80663114
https://github.com/mqyqingfeng/Blog/issues/36 
*/

var arr = [1, [2, [3, 4]]];
//  console.log([].concat(...arr)); // [1, 2, [3, 4]]
function flattern(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flattern(arr));
//  console.log(arr)
function flattern2(array) {
  let newArray = [];
  for (var i = 0; i < array.length - 1; i++) {
    if (array[i] instanceof Array) {
      //判断是不是数组
      newArray = newArray.concat(flattern2(array[i]));
    } else {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

