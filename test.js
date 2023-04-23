
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


const handler = {
  get(target, key, receiver) {
    console.log('get', key)
    if (key === 'isReactive') {
      return true
    }
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver)
  }
}

function reactive(obj) {
  if (obj['isReactive']) {
    return obj
  }
  return new Proxy(obj, handler)
}

var obj = { a: 1 }
var state = reactive(obj)

// console.log(reactive(state) === state)
state.a + 1
state.a

const a = () => {
  return 'a'
}
var set = new Set()
set.add(a)
set.add(a)
console.log(set.size)


const c = () => {
  return 'c'
}
const b = () => {
  return 'b'
}
function render() {
  return (1, c(), b(), 4)
}
console.log(render())


const fn1 = () => {
  console.log('fn1')
}
const fn2 = () => {
  console.log('fn2')
}
const fn3 = () => {
  console.log('fn3')
}

fn1(fn2(fn3()))


// var data = [
//   { id: 1, name: "办公管理", pid: 0 },
//   { id: 2, name: "请假申请", pid: 1 },
//   { id: 3, name: "出差申请", pid: 1 },
//   { id: 4, name: "请假记录", pid: 2 },
//   { id: 5, name: "系统设置", pid: 0 },
//   { id: 6, name: "权限管理", pid: 5 },
//   { id: 7, name: "用户角色", pid: 6 },
//   { id: 8, name: "菜单设置", pid: 6 },
// ]

// function toTree(data,pid) {
//    var arr = []
// }

var data = [
  { id: 1, name: '衣服', pid: 0 },
  { id: 2, name: '裤子', pid: 0 },
  { id: 3, name: '外套', pid: 1 },
  { id: 4, name: '短裤', pid: 2 },
  { id: 5, name: '风衣', pid: 3 }
]
function filterArray(data, parent){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].pid === parent) {
      temp.push(data[i])
      data[i].children = filterArray(data, data[i].id) //返回值是一个数组，又赋值给data[i].children
    }
  }
  return temp
}
let tree=filterArray(data,0)
console.log(tree)


var ab = 'pwweadc'
// console.log(ab.indexOf('d'),ab.slice(1))
// var bb = " "
// console.log(bb.length,Boolean(bb))
 console.log(ab.split('').filter(item => item==='w').length)
 console.log(ab.match(/w/g))