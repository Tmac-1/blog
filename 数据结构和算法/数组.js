
// reducer方法 https://segmentfault.com/a/1190000017420042

// 查找（二分查找（有序数组））[1,2,3,4,5,6,7,8] 5
var arr = [1, 2, 3, 3, 3, 4, 4, 4, 5, 6, 7, 8];
function binaryFind(num, arr, start, end) {
  if (start <= end) {
    if (num == arr[start]) {
      return start;
    }
    if (num == arr[end]) {
      return end;
    }
    let mid = Math.ceil((start + end) / 2);
    if (num == arr[mid]) {  // 可能存在数组中好几个被选中的数
      let findArr = [];
      findArr.push(mid);
      let tem = mid;
      while (tem++) {
        if (num == arr[tem]) {
          findArr.push(tem);
        } else {
          break;
        }
      }
      tem = mid;
      while (tem--) {
        if (num == arr[tem]) {
          findArr.unshift(tem);
        } else {
          break;
        }
      }
      return findArr;
    }
    if (num < arr[mid]) {
      return binaryFind(num, arr, 0, mid - 1);
    }
    if (num > arr[mid]) {
      return binaryFind(num, arr, mid + 1, end);
    }
  }
  return -1;
}
console.log(binaryFind(3, arr, 0, arr.length - 1));

//  https://blog.csdn.net/mrdeng_web2018/article/details/108426604 
// 链表 Hash表
/**
 * 最少硬币找钱问题 change = new Change([1,5,10,20,50,100]) change.makeChange(13)  
 * 动态规划：动态调整全局最优解 贪心算法：只考虑局部最优解
 * https://www.jianshu.com/p/eb7bee8528cc
 * */
class minChangeQues {
  constructor(coins) {
    this.coins = coins
    this.cache = {}
  }
  changeCoins(amount) {
    let me = this
    if (this.cache[amount]) {
      return this.cache[amount]
    }
    let min = [], newMin, newAmount
    for (let i in this.coins) {
      let coin = this.coins[i]
      newAmount = amount - coin // 先找一个试试，看看还剩多少钱
      if (newAmount >= 0) { // 没找完，再找一次
        newMin = me.changeCoins(newAmount)  // 返回的一个数组，这里体现动态规划
      }
      /** newMin.length 数组长度大于0，因为 changeCoins(0) 是空数组 
       *  当 newMin.length = 0 ，说明可能上个硬币能被整数减少 
       *  例如 5-5 此时newMin.length == 0 但是 newAmount=0  !newAmount=true，
       *  此时进入判断条件，coin = 5 newMin是个空数组
       * */
      if (newAmount >= 0 && (newMin.length || !newAmount)) {  // 
        min = [coin].concat(newMin)
      }
    }
    return (this.cache[amount] = min)
  }
}
let temp = new minChangeQues([1, 5, 10, 25])
console.log(temp.changeCoins());
// 背包问题
// 斐波拉契数列(爬楼梯，10层楼梯，每次只能走一级或者两级，一共多少中走法)
// 暴力斐波拉契
function fib(n) {
  if (n == 1 || n == 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

// 带备忘录的斐波拉契
function fib1(n) {
  let cache = [];
  return helper(cache, n);
}
function helper(cache, n) {
  if (n == 1 || n == 2) return 1;
  if (cache[n]) return cache[n];
  // 缓存保留计算结果，避免冗余计算
  cache[n] = helper(cache, n - 1) + helper(cache, n - 2);
  return cache[n];
}

// 前面两种算法都是自顶向下，动态规划要求自底向上，这样就不再使用递归
function fib3(n) {
  let dp = [];
  dp[1] = dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    dp[n] = dp[n - 1] + dp[n - 2];
  }
  return dp[n];
}
