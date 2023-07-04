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
    console.log("get", key);
    if (key === "isReactive") {
      return true;
    }
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key);
    return Reflect.set(target, key, value, receiver);
  },
};

function reactive(obj) {
  if (obj["isReactive"]) {
    return obj;
  }
  return new Proxy(obj, handler);
}

var obj = { a: 1 };
var state = reactive(obj);

// console.log(reactive(state) === state)
state.a += 1;
// state.a = 1

const a = () => {
  return "a";
};
var set = new Set();
set.add(a);
set.add(a);
console.log(set.size);

const c = () => {
  return "c";
};
const b = () => {
  return "b";
};
function render() {
  return 1, c(), b(), 4;
}
console.log(render());

const fn1 = () => {
  console.log("fn1");
};
const fn2 = () => {
  console.log("fn2");
};
const fn3 = () => {
  console.log("fn3");
};

fn1(fn2(fn3()));

var stack = [];
var cur = null;
stack.push((cur = []));
cur.push(1);
console.log(stack);

function effectFn(fn) {
  fn();
}
effectFn(() => {
  console.log(11);
});

// var str = ['aac','ac','abc']
// var str = [1,3,2]
var str = ["a", "c", "b"];
var newstr = str.sort((a, b) => {
  // console.log(a,b)
  // let i = 0
  // if(a[i]===b[i]){
  //   i++
  // }else{
  //   return b[i].charCodeAt()-a[i].charCodeAt()
  // }

  // return a-b
  return a.charCodeAt() - b.charCodeAt();
});
console.log(str, newstr);
console.log("a".charCodeAt());
console.log("b".charCodeAt());
// var t11 = '112c31abc'
// console.log(t11.match(/[a-zA-Z]/g))
1