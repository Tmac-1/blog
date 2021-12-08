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
  on(name, callback) {
    if (!this.events.has(name)) {
      this.events.set(name, callback);
    } else {
      let listener = this.events.get(name);
      if (Array.isArray(listener)) {
        listener.push(callback);
      } else {
        listener = [listener, callback];
      }
      this.events.set(name, listener);
    }
  }
  emit(name, data) {
    if (this.events.has(name)) {
      let listener = this.events.get(name);
      if (Array.isArray(listener)) {
        listener.forEach((item) => item(data));
      } else {
        listener(data);
      }
    }
  }
  off(name, listener) {
    let listeners = this.events.get(name);
    if (Array.isArray(listener)) {
      const index = listeners.indexOf(listener);
      index > -1 && listeners.splice(index, 1);
    } else {
      listeners && this.events.delete(name);
    }
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
