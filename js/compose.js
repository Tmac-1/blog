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
  
  /** 
  *  将下一个要执行的中间件作为上一个中间的next()函数
  */ 
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