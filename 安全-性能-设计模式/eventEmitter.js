// https://juejin.cn/post/6931187413356118030" 实现eventEmiiter
// https://www.jianshu.com/p/42b8192f7088 小程序中实现状态管理
// https://blog.csdn.net/hf872914334/article/details/88899326 观察者模式和发布订阅模式的区别

// const EventEmitter = require("events");
// const myEmitter = new EventEmitter();
// myEmitter.on("event", () => {
//   console.log("1 an event occurred!");
// });
// myEmitter.on("event", () => {
//     console.log("2 an event occurred!");
// });
// myEmitter.emit("event");

// var listen = () => {
//     console.log("3 an event occurred!");
// }
// myEmitter.on("event1",listen);
// myEmitter.off("event1",listen)
// myEmitter.emit("event1");

class EventsEmitter {
  constructor() {
    this.events = new Map();
  }
  // 订阅
  on(name, callback) {
    if (!this.events.has(name)) {
      this.events.set(name, [callback]);
    } else {
      const listener = this.events.get(name);
      listener.push(callback)
      this.events.set(name, listener);
    }
  }
  // 发布
  emit(name, data) {
    if (this.events.has(name)) {
      const listener = this.events.get(name);
      listener.forEach((item) => item.call(this,data));
    }
  }
  // 取消
  off(name, listener) {
    const listeners = this.events.get(name);
    const index = listeners.indexOf(listener);
    index > -1 && listeners.splice(index, 1);
  }
}
let emitter = new EventsEmitter();
emitter.on("ev01", (val) => {
  console.log("1", val);
});
emitter.on("ev01", (val) => {
  console.log("2", val);
});
emitter.emit("ev01", { data: 1 }); 



// 观察者模式
class Subject {
  constructor(name) {
    this.name = name
    this.state = '开心'
    this.observer = []
  }

  // 将观察者绑定到自己身上
  attach(obs){
    this.observer.push(obs)
  }

  setState(state){
    this.state = state
    this.observer.forEach(item=>item.update(this))
  }
}

class Observer {
  constructor(name){
     this.name = name
  }

  update(subject){
    console.log(`${this.name}观察到${subject.name}的状态：${subject.state}`)
  }
}

const baby = new Subject('宝宝')
const fa = new Observer('爸爸')
const ma = new Observer('妈妈')
baby.attach(fa)
baby.attach(ma)
baby.setState('不开心')
