
// 概念：柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术 

function add(a, b) {
    return a + b;
}
// 执行 add 函数，一次传入两个参数即可
add(1, 2) // 3
// 假设有一个 curry 函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2) // 3

function sub_curry(fn) {
    return function () {
        return fn()
    }
}

function curry(fn, length) {
    length = length || 4;
    console.log(length)
    return function () {
        if (length > 1) {
            return curry(sub_curry(fn), --length)
        }
        else {
            return fn()
        }
    }
}
// var fn0 = function(){
//     console.log(1)
// }
// var fn1 = curry(fn0)
// // console.log(fn1)
// fn1()()()()// 1
// // fn1()()()() // 1
var fn0 = function (a, b, c, d) {
    return [a, b, c, d];
}

var fn1 = curry(fn0);
console.log(fn1("a", "b")) 
