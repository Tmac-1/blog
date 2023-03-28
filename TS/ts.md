### 学习地址
https://github.com/JasonkayZK/typescript_learn

**接口**：interface 用来负责定义一个类的结构，可以去限制一个对象， 也可以用一个对象（类）去实现（implements）一个接口
``` c
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

**泛形**：是指在定义函数、接口、类的时候，不预先指定具体的类型，而是在使用的时候再制定类型的一种特性
``` c
function fun<T>(arg:T):T{return arg}
fun<number>(123)

function fun1<T extends String | string[]>(arg:T):number { 
    return arg.length
}
fun1<string>('aaa')
fun1<string[]>(['a','b'])

接口泛型
interface IArg {
    length: number
}

func2<T extends IArg>(arg: T):number {
    return arg.length
}
```

函数约束
类和抽象类 （修饰符）
- static 静态方法或者属性，只能在类上调用，不能在实例上调用
- public 公开的，能在这
- protected 只能在当前类和当前类的子类内部使用
- private 私有的，当前类的内部使用

**装饰器** 
就是一个方法，可以注入到类、方法、属性参数上类扩展类、属性、方法、参数的功能
- 类装饰器 - 不能传递参数
- 装饰器工厂
  ``` c
  function fun(options) {
   return function(target){
      target.prototype.name = options.name
      target.prototype.age = options.age
   }
  }
  ```
- 装饰器组合 - 结合起来一起使用，会先<font color='red'>从上至下</font>执行所有的装饰器工厂，拿到所有真正的装饰器，然后再<font color='red'>从下至上</font>执行所有的装饰器
  ``` c
  @deco1  // 类装饰器
  @deco2() // 装饰器工厂
  @deco3()
  @deco4
  class Person {}
  ```
- 属性装饰器
- 方法装饰器
  
### type 和 interface区别
https://blog.csdn.net/weixin_43758377/article/details/110470780
type可以声明基本类型别名、联合类型、元祖等类型
interface只能声明对象类型，可以用&合并声明
一般来说，能用interface实现，就用interface，如果不能就用type

### declare
1. 声明全局变量、处理第三方库引用提示的TS报错问题
2. 声明模块，处理TS不解析相关文件报错的问题
   ``` c
   declare module '*.css';
   declare module '*.less';
   declare module '*.png';
   ```
3. declare module语法扩展已有类型 https://www.bilibili.com/opus/666443512666914832

### 特殊符号
1.  ！非空断言 （具体而言，x! 将从 x 值域中排除 null 和 undefined ）
2.  ?? 空值合并运算符 （当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数）
3.  as或者<T> 类型断言，在我们明确知道具体类型时候使用
   ``` c
   let strLength: number = (<string>someValue).length
   let strLength: number = (someValue as string).length
   ```
4. is （类型谓词）： 所谓 is 关键字其实更多用在函数的返回值上，用来表示对于函数返回值的类型保护
   ``` c
   // 函数的返回值类型中 通过类型谓词 is 来保护返回值的类型
    function isNumber(arg: any): arg is number { 
      return typeof arg === 'number'
    }
 
    function getTypeByVal(val:any) { 
      if (isNumber(val)) {  
        // 此时由于isNumber函数返回值根据类型谓词的保护  
        // 所以可以断定如果 isNumber 返回true 那么传入的参数 val 一定是 number 类型   
        val.toFixed() 
      }
    }
     // https://www.jianshu.com/p/57df3cb66d3d
   ```

### 高级类型和用法
https://blog.csdn.net/weCat_s/article/details/122554460