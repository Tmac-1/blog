

//   https://www.jianshu.com/p/c51d63028371 参考链接 
//   https://blog.csdn.net/qq_36157085/article/details/92378514 ~~ 运算符，常用来取整 


function sumBigNumber(a, b) {
    var res = '',
        temp = 0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || temp) {
        temp += ~~a.pop() + ~~b.pop();  // temp是true时候隐式转换成1
        res = (temp % 10) + res;  // 专成字符串 数值 + 字符串 = 字符串
        temp = temp > 9;
    }
    console.log(res)
    // return res.replace(/^0+/, '');
}
sumBigNumber('100000000000002222', '111111'); // 100000000000113333

    // js小数精度丢失问题   进度丢失可能出现在进制转化和对阶运算  https://juejin.cn/post/6844903680362151950
