class CopyrightWebapckPlugin {
    constructor(options) {
        // console.log(options)
    }
    // complier:webpack实例
    apply(complier) {
        debugger
        // console.log('complier', complier)
        // emit 生成资源文件到输出目录之前
        complier.hooks.emit.tapAsync(
            "CopyrightWebapckPlugin111",
            (compilation, cb) => {
                // complier.hooks.processAssets.tap
                // compilation.emitAsset('test.js','./dist',111)
                compilation.assets["copyright.txt"] = {
                    // 文件内容   
                    source: function () {
                        return "hello copy"
                    },
                    // 文件大小  
                    size: function () {
                        return 20
                    }
                };
                //  完成之后，走回调，告诉compilation事情结束
                cb()
            }
        );
        // 同步的写法
        //    complier.hooks.compile.tap("CopyrightWebapckPlugin",compilation=>{
        //        console.log('开始了')
        //    })
    }
}
module.exports = CopyrightWebapckPlugin;

// https://blog.csdn.net/weixin_43845044/article/details/108442936
// https://segmentfault.com/a/1190000022750782