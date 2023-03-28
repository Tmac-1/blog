
/** 栈是一种特殊的线性表，仅能够在栈顶进行操作，有着先进后出（后进先出）的特性。
 
    栈的方法
    push一个元素到栈顶
    pop弹出栈顶元素
    top返回栈顶元素，注意：不是弹出
    isEmpty判断栈是否为空
    size返回栈里元素的个数
    clear清空栈
 */

function Stack() {
    var items = []; // 使用数组存储数据(私有属性)
    // 从栈顶添加元素，也叫压栈
    this.push = function (item) {
        items.push(item)
    }
    // 弹出栈顶元素
    this.pop = function () {
        return items.pop();
    }
    // 返回栈顶元素
    this.top = function () {
        return items[items.length - 1]
    }
    // 判断栈是否为空
    this.isEmpty = function () {
        return items.length == 0;
    }
    // 返回栈的大小
    this.size = function () {
        return items.length;
    }
    // 清空栈
    this.clear = function () {
        items = [];
    }
}
var str01 = "((12132))("; //不合法
var str02 = "((1232131))()"; //合法

// var str01 = "[{(}]" ; // 合法
// var str02 = "[{]}" ; // 不合法
// 判断括号是否合法
function is_leagl_brackets(str) {
    var stack = new Stack();
    for (var i = 0; i < str.length; i++) {
        var item = str[i];
        if (item == '(') {
            stack.push(item)
        } else if (item == ')') {
            if (stack.isEmpty()) {
                return false;
            } else {
                stack.pop()
            }
        }
    }
    console.log(stack)
    return stack.isEmpty()
}
console.log(is_leagl_brackets(str01));
console.log(is_leagl_brackets(str02));

// 栈Stack 后进先出 只能操作队尾 push pop 操作    --- {(<>)} 括号匹配问题
function legalBrackets(str) {
    let stack = []
    let map = {
        '{': '}',
        '[': ']',
        '(': ')',
    }
    for (let item of str) {
        if (map[item]) {
            stack.push(item)
        } else if (Object.values(map).includes(item)) {
            let last = stack.pop()
            if (item !== map[last]) return false
        }
    }
    return stack.length == 0
}
console.log(legalBrackets("()")); //true
console.log(legalBrackets("([ ) ]")); //false
console.log(legalBrackets("([{ )]")); //false
console.log(legalBrackets("()[ ]{}")); //true
console.log(legalBrackets(" { ]")); //false
console.log(legalBrackets("{ [ ] }")); //true
console.log(legalBrackets("function a (){console.log(1111)}"))// true

//计算后缀表达式
function calc_exp(exp) {
    var stack = new Stack();
    for (var i = 0; i < exp.length; i++) {
        var item = exp[i];
        if (["+", "-", "*", "/"].indexOf(item) >= 0) {
            var value_1 = stack.pop();
            var value_2 = stack.pop();
            var exp_str = value_2 + item + value_1;
            // 计算并取整
            var res = parseInt(eval(exp_str));
            //计算结果压入栈中
            stack.push(res.toString());
        } else {
            stack.push(item)
        }
    }
    return stack.pop();
}
