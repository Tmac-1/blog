
// https://juejin.cn/post/6847902216028848141 promise可以中断，但是不能终止
// https://juejin.im/post/5b6161e6f265da0f8145fb72 promiseA+
// https://github.com/forthealllight/blog/issues/4 
// https://gitee.com/hongjilin/hongs-study-notes/tree/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/Promise%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0#%E2%85%A6--%E4%B8%AD%E6%96%AD-promise-%E9%93%BE B站promise学习笔记

//  var p1 = new Promise((resolve,reject)=>{
//      resolve('成功')
//     // reject('失败')
//  })
//  p1.then((res)=>{
//      console.log(res)
//  },(reason)=>{
//      console.log(reason)
//  })
//  Promise 有三个状态 pending fulfilled rejected 状态一旦改变就不可变，接受一个函数作为参数
//  实例的then方法接受两个参数 promise.then(onFullfilled,onRejected)
//  第一版
function MyPromise(constructor) {
    var _this = this;  // 保存实例对象的this
    _this.status = 'pending'; // 初始状态
    _this.value = undefined; // 定义状态为resolved 的时候的值
    _this.reason = undefined; // 定义状态为rejected 的时候的值 
    function resolve(value) {  // resolves是在全局调用的，所以要修正this指向
        if (_this.status == 'pending') {
            _this.value = value;
            _this.status = 'resolved'
        }
    }
    function reject(reason) {
        if (_this.status == 'pending') {
            _this.reason = reason;
            _this.status = 'rejected'
        }
    }
    constructor(resolve, reject)
}
MyPromise.prototype.then = function (onFullfilled, onRejected) {
    var _this = this;
    console.log(_this.status)
    switch (_this.status) {
        case 'resolved':
            onFullfilled(_this.value);
            break;
        case 'rejected':
            onRejected(_this.reason);
            break;
        default:
            break;
    }
}

var p2 = new MyPromise((resolve, reject) => {
    resolve('MyPromise')
})
p2.then((res) => {
    console.log(res)
})
// var p4 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{resolve(2000)},0)
// })
// p4.then((res)=>{
//     console.log(res)
// })
var p3 = new MyPromise((resolve, reject) => {
    setTimeout(() => { resolve(1000) }, 0)
})
// setTimeout(()=>{
//     p3.then((res)=>{
//       console.log(res)
//     })
// },1000)
p3.then((res) => {
    console.log(res)
})

//  第二版 （添加异步处理）
function MyPromise(constructor) {
    var _this = this;
    _this.status = 'pending';
    _this.value = undefined;
    _this.reason = undefined;
    _this.onFullfilledArr = []; // Z指定多个回调 p.then() p.then() 这种
    _this.onRejectedArr = [];
    function resolve(val) {
        if (_this.status == 'pending') {
            _this.value = val;
            _this.status = 'resolved';
            _this.onFullfilledArr.forEach(f => {
                f()
            })
        }
    }
    function reject(val) {
        if (_this.status == 'pending') {
            _this.reason = val;
            _this.reason = 'reject';
            _this.onRejectedArr.forEach(f => {
                f()
            })
        }
    }
    constructor(resolve, reject)
}
MyPromise.prototype.then = function (onFullfilled, onRejected) {
    var _this = this
    console.log(_this.status)
    switch (_this.status) {
        case 'pending': // 如果有异步任务，先被挂起，后执行，不会执行下面的case resolve或者reject，只有同步任务的时候回走下面
            _this.onFullfilledArr.push(function () {
                onFullfilled(_this.value);
            })
            _this.onRejectedArr.push(function () {
                onRejected(_this.reason)
            })
        case 'resolved':
            onFullfilled(_this.value);
            break;
        case 'rejected':
            onRejected(_this.reason);
            break;
        default:
    }
}

// 第三版 （  添加链式回调 ）
function MyPromise(constructor) {
    var _this = this;
    _this.status = 'pending';
    _this.value = undefined;
    _this.reason = undefined;
    _this.onFullfilledArr = [];
    _this.onRejectedArr = [];
    function resolve(val) {
        if (_this.status == 'pending') {
            _this.value = val;
            _this.status = 'resolved';
            _this.onFullfilledArr.forEach(f => {
                f()
            })
        }
    }
    function reject(val) {
        if (_this.status == 'pending') {
            _this.reason = val;
            _this.reason = 'reject';
            _this.onRejectedArr.forEach(f => {
                f()
            })
        }
    }
    constructor(resolve, reject)
}
function resolvePromise(promise, x, resolve, reject) {
    //  console.log(promise,x,resolve,reject)
    if (promise === x) {
        throw new TypeError("type error")
    }
    let isUsed;
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
        // alert(22)
        try {
            let then = x.then;
            if (typeof then === "function") {
                //是一个promise的情况
                then.call(x, function (y) {
                    if (isUsed) return;
                    isUsed = true;
                    resolvePromise(promise, y, resolve, reject);
                }, function (e) {
                    if (isUsed) return;
                    isUsed = true;
                    reject(e);
                })
            } else {
                //仅仅是一个函数或者是对象
                resolve(x)
            }
        } catch (e) {
            if (isUsed) return;
            isUsed = true;
            reject(e);
        }
    } else {
        //返回的基本类型，直接resolve
        resolve(x)
    }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
    var _this = this;
    var promise02 = undefined;
    console.log(_this.status)
    switch (_this.status) {
        case 'pending':
            promise02 = new MyPromise(function (resolve, reject) {
                _this.onFullfilledArr.push(function () {
                    setTimeout(function () {
                        try {
                            let temple = onFullfilled(_this.value);
                            resolvePromise(promise02, temple, resolve, reject);
                        } catch (e) {
                            reject(e) //error catch
                        }
                    })
                })
                _this.onRejectedArr.push(function () {
                    setTimeout(function () {
                        try {
                            let temple = onRejected(_this.reason);
                            resolvePromise(promise02, temple, resolve, reject);
                        } catch (e) {
                            reject(e)// error catch
                        }
                    })
                })
            })
        case 'resolved':
            promise02 = new MyPromise(function (resolve, reject) {
                // var temple = onFullfilled(_this.value);
                // resolve(temple)
                setTimeout(function () {
                    try {
                        let temple = onFullfilled(_this.value);
                        //将上次一then里面的方法传递进下一个Promise状态
                        resolvePromise(promise02, temple, resolve, reject);
                    } catch (e) {
                        reject(e);//error catch
                    }
                })
            })
            break;
        case 'rejected':
            promise02 = new MyPromise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        let temple = onRejected(_this.reason);
                        //将then里面的方法传递到下一个Promise的状态里
                        resolvePromise(promise02, temple, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            })
            break;
        default:
    }
    return promise02;
}

//    let p1 = new MyPromise((resolve,reject)=>{
//        resolve(1)
//    })
//    p1.then((res)=>{
//        console.log('first then',res)
//        return 2;
//    }).then((res)=>{
//        console.log('second then',res)
//    })

var p = new MyPromise(function (resolve, reject) {
    resolve("初始化promise")
})
p.then(function () {
    return new MyPromise(function (resolve, reject) {
        resolve("then里面的promise返回值")
    })
}).then(function (x) {
    console.log(x)
})

// const pp1 = new MyPromise((resolve, reject) => {
//     setTimeout(() => { reject(new Error('Fail')) }, 1000)
// })
// const pp2 = new Promise((resolve, reject) => {
//     setTimeout(() => { resolve(pp1) }, 100)
// })
// pp2.then((res) => {
//     console.log('success', res)
// }).catch((err) => {
//     console.log(err)
// })


// 红绿灯问题Promise
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
var light = function (timmer, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            cb();
            resolve();
        }, timmer);
    });
};
var step = function () {
    Promise.resolve().then(function () {
        return light(1000, red);
    }).then(function () {
        return light(10000, green);
    }).then(function () {
        return light(1000, yellow);
    }).then(function () {
        step();
    });
}
step();


// 实现一个repeat
function repeat(fn,times,timer){

}

let repeatHelloWorld = repeat(alert,4,3000)
repeatHelloWorld('hello world')