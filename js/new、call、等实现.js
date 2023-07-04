

/** 箭头函数  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 *  箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this，arguments，super或new.target。
 *  箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this
 *  不绑定arguments
 * */
var a = (b) => {
    console.log(arguments[0])  // 会报错
}

/** new 操作  https://www.cnblogs.com/shuizhongyu111/p/7355383.html
 *  它创建了一个全新的对象。
 *  它会被执行[[Prototype]]（也就是__proto__）链接。
 *  它使this指向新创建的对象。。
 *  通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
 *  如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用。
 * */
function Person(name, job) {
    this.name = name;
    this.job = job
}
function New(func) {
    var res = {};
    if (func.prototype !== null) {
        res.__proto__ = func.prototype
    }
    //   console.log('res',res) 
    var ret = func.apply(res, [...arguments].slice(1));
    //   console.log('res',res)
    if (typeof ret == 'object' || typeof ret == 'function' && typeof ret !== null) {
        return ret;
    }
    return res;
}
var obj01 = new Person('Tmac-1', '火箭队');
console.log(obj01)
var obj02 = New(Person, 'Tmac-1', '火箭队')
console.log(obj02)


/** call 和 apply 的实现
 *  call核心：
 *  将函数设为对象的属性
 *  执行&删除这个函数
 *  指定this到函数并传入给定参数执行函数
 *  如果不传入参数，默认指向为 window
 * */
Function.prototype.call2 = function (content = window) {
    // console.log(this)
    content.fn = this; // this是boo函数
    var arg = [...arguments].slice(1);
    let result = content.fn(...arg);
    delete content.fn;
    return result;
}
var foo = {
    name: 'Tmac-1'
}
function boo(job, sex) {
    console.log(job, sex, this.name)
}
boo.call2(foo, "火箭", "男")
console.log('foo', foo)

/**
 * bind的实现  https://blog.csdn.net/smallsun_229/article/details/80298147
 * https://github.com/mqyqingfeng/Blog/issues/12
 * 各类继承的优缺点 https://github.com/mqyqingfeng/Blog/issues/16
 * */
Function.prototype.bind2 = function (content) {
    if (typeof this != "function") {
        throw Error("not a function")
    }
    // 若没问参数类型则从这开始写
    console.log('arguments', arguments)
    let fn = this;
    // console.log('this',this)
    let args = [...arguments].slice(1);
    let resFn = function () {
        // console.log('this',this) 这里的this指向最后的new 实例化构造出来的对象
        // console.log('content',content,args.concat(...arguments))
        // console.log(this instanceof resFn)
        return fn.apply(this instanceof resFn ? this : content, args.concat(...arguments))
    }
    function tmp() { }  // 
    tmp.prototype = this.prototype;
    resFn.prototype = new tmp();
    // console.log('resFn',resFn)
    return resFn;
}

/**
 * reduce实现map
 * 思路：1、判断传入的fn是否是一个函数，如果不是则抛出异常
 *      2、使用reduce进行拼接调用，最后返回
 *      3、this指向的是调用map的数组
 * */
Array.prototype.myMap = function(fn,thisArg = []){
	//如果fn传入的不是一个函数则抛出异常
	if(typeof fn != 'function'){
		throw new Error(`${fn} is not a function`);
	}
	return this.reduce((pre,cur,index,arr) => {
		return pre.concat(fn.call(thisArg,cur,index,arr));
	},[])
}
const arr = [2,3,1,5];
const temp = arr.myMap(item => item * 2);
console.log(temp);
