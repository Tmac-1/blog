
// var props={}
// var stateProps={num:1}
// console.log({...props,...stateProps})

// var a = 'hadh'
// console.log(~~a)

// let Person = {}

// Object.defineProperty(Person, 'name', {
//    value: 'jack',
//    writable: true // 是否可以改变
// })
// // Person.name = 111
// console.log(Person.name)

// let obj = {
//     a:1
// }

// function test(a,b){
//     console.log(this.a)
// }

// test.call(obj,1,2)
// console.log(obj)

// let i;
// for (let i = 0; i < 3; i++) {
//   const log = () => {
//     console.log(i);
//   }
//   setTimeout(log, 100);
// }


// function quickSort(arr){
//    if(arr.length<=1){
//       return arr
//    }
//    let index = Math.floor(arr.length/2);
//    var tem = arr.splice(index,1)
//    var left = [], right = []
//    for(var i=0;i<arr.length;i++){
//       if(arr[i]>tem){
//          right.push(arr[i])
//       }else{
//          left.push(arr[i])
//       }
//    }
//    return quickSort(left).concat(tem,quickSort(right))
// }
// console.log(quickSort(arr))
// var i = 1;
// console.log(++i,i)

// var arr = [1,2,3,4,5]
// console.log(arr.splice(1,1),arr)
// console.log(arr.slice(1,2),arr)

// arr.sort((a,b)=>{
//    return a-b
// })
// console.log(arr)

// var arr01 = [1,2,3]
// function shuffle(arr){
//    for(var i=0;i<arr.length;i++){
//       let j = Math.floor(Math.random() * arr.length);
//       [arr[i],arr[j]]=[arr[j],arr[i]]
//    }
//    return arr
// }
// shuffle(arr01)

//
//  var arr=[1,[2,3],[1,1],[4,[5,6,[7,8]]]]
//  function flat(arr){
//     for(var i=0; i<arr.length; i++){
//         if(Array.isArray(arr[i])){
//            arr = [].concat(...arr)
//         }
//     }
//     return arr
//  }

//  console.log(flat(arr))

// 斐波拉契
// function fib(n){
//    if(n==1 || n==2) return 1;
//    return fib(n-1)+fib(n-2)
// }
// console.log(fib(10))

// 二分查找
// var arr = [1,2,3,3,3,4,4,4,5,6,7,8]

// function binaryFind(num,arr,start,end){
//    if(start<=end){
//       if(num==arr[start]){
//          return start
//       }
//       if(num==arr[end]){
//          return end
//       }
//       let mid = Math.ceil((start+end)/2)
//       if(num == arr[mid]){
//          let findArr = []
//          findArr.push(mid)
//          let tem = mid;
//          while(tem++){
//             if(num==arr[tem]){
//                findArr.push(tem)
//             }else{
//                break;
//             }
//          }
//          tem = mid;
//          while(tem--){
//             if(num==arr[tem]){
//                findArr.unshift(tem)
//             }else{
//                break;
//             }
//          }
//          return findArr
//       }
//       if(num<arr[mid]){
//         return binaryFind(num,arr,0,mid-1)
//       }
//       if(num>arr[mid]){
//         return binaryFind(num,arr,mid+1,end)
//       }
//    }
//    return -1
// }
// console.log(binaryFind(3,arr,0,arr.length-1))


// 找钱问题 change = new Change([1,5,10,20,50,100]) change.makeChange(13)

// class Change {
//    constructor(coins){
//       this.coins = coins;
//       this.caches = {}
//    }
//    makeChange(amount){
//       if(this.caches[amount]){
//          return this.caches[amount]
//       }
//       let min = [], leftArr=[] ,leftAmount
//       for(let i in this.coins){
//           leftAmount = amount-this.coins[i];
//          if(leftAmount>=0){
//            leftArr = this.makeChange(leftAmount)
//          }
//          if(leftAmount>=0 && (leftArr.length || !leftAmount)){
//             // min = [this.coins[i]].concat(leftArr)
//             min = leftArr.concat([this.coins[i]])
//          }
//       }
//       return this.caches[amount]= min
//    }
// }
// var change = new Change([1,5,10,20,50,100])
// console.log(change.makeChange(13))

// function a(){
//    console.log(1)
// }
// function b(){
//    console.log(2)
// }
// b(a()) // 1 2

// function f1(arg){
//    console.log("f1",arg)
//    return arg
// }
// function f2(arg){
//    console.log("f2",arg)
//    return arg
// }
// function f3(arg){
//    console.log("f3",arg)
//    return arg
// }
// // let res = f1(f2(f3('omg')))

// let res = compose(f1,f2,f3)('omg')
// function compose(...funcs){
//    if(funcs.length==0){
//       return args => args
//    }
//    if(funcs.length==1){
//       return funcs[0]
//    }
//    return funcs.reduce(function(total,current){
//       return function(...args){
//         console.log('total',total)
//         return total(current(...args))
//       }
//    })
//    // return funcs.reduce((total,current)=> (...args)=>total(current(...args)) )
// }
// console.log('res',res)

// function createObj(o) {
//       function F(){}
//       F.prototype = o;
//       return new F();
//   }

//   var person = {
//       name: 'kevin',
//       friends: ['daisy', 'kelly']
//   }

// //   var person1 = createObj(person);
// //   var person2 = createObj(person);
// var person1 = Object.create(person);
// var person2 = Object.create(person);

//   person1.name = 'person1';
//   console.log(person2.name); // kevin

//   person1.friends.push('taylor');
//   console.log(person2.friends); // ["daisy", "kelly", "taylor"]

// var obj = {
//    x:1,
//    a:function(){
//       console.log(this.x)
//    }
// }
// obj.a()

// var x = 2
// var obj2 = {
//       x:1,
//       a:()=>{
//          console.log(this.x)
//       }
// }
// obj2.a()

// async function test(){
//    let res1 = await Promise.all([1,2,3])
//    return res1
// }
// let res = await test()
// console.log(res)

// class A {
//   constructor(options) {
//     this.name = options.name
//   }
//   run() {
//     console.log(111,this.name)
//   }
// }
 
// class B extends A {

// }

// let b = new B({name:'tmac'})
// b.run()


const handler = {
  get(target,key,receiver){
    console.log('get',key)
    if(key === 'isReactive') {
      return true
    }
     return Reflect.get(target,key,receiver)
  },
  set(target,key,value,receiver){
     return Reflect.set(target,key,value,receiver)
  }
}

function reactive(obj){
  if(obj['isReactive']){
    return obj
  }
  return new Proxy(obj,handler)
}

var obj = {a:1}
var state = reactive(obj)

// console.log(reactive(state) === state)
state.a + 1
state.a

function fn(obj){
  var a = obj.b
  console.log(11,a)
  if(!a){
    a = obj.b = 1
  }
}
var c = {c:1}
fn(c)
fn(c)

const a = ()=>{
  return 'a'
}
var set = new Set()
set.add(a)
set.add(a)
console.log(set.size)


// var test = 1
// var step = 2
// function add(){
//   test += step  // test = test + step
// }
// add()
// add()
// console.log('test',test)

const c = ()=>{
  return 'c'
}
const b = ()=>{
  return 'b'
}
function render(){
  return (1,c(),b(),4)
}
console.log(render())


const fn1 = ()=>{
  console.log('fn1')
}
const fn2 = ()=>{
  console.log('fn2')
}
const fn3 = ()=>{
  console.log('fn3')
}

fn1(fn2(fn3()))

Promise.prototype.finally = function (callback) {
  console.log(11,this,this.constructor)
};
var p1 = new Promise(()=>{

})
p1.finally()

let mp = new Map()
mp.set('a',1)
mp.set('b',2)
console.log(mp)



function num(ctx, next) {
  console.log('starting num ...');
  next(ctx * 10);
  console.log('ending num ...');
}

function discount(ctx, next) {
  console.log('starting discount ...');
  next(ctx * 0.8);
  console.log('ending discount ...');
}

function express(ctx, next) {
  console.log('starting express ...');
  next(ctx + 12);
  console.log('ending express ...');
}

const sell = compose([num, discount, express]);
console.log(sell(150));

// 实现一个 compose
function compose(args) {
  let result;
  return function (ctx) {
    let i = 0;

    let dispatch = function (i, ctx) {
      let fn;
      if (i < args.length) fn = args[i];
      if (i === args.length) {
        result = ctx;
        return;
      }
      return fn(ctx, dispatch.bind(null, ++i));
    };

    dispatch(i, ctx);
    return result;
  };
}