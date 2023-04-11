
// 实现真正的乱序 "https://github.com/mqyqingfeng/Blog/issues/51"
// 常见排序 https://www.jb51.net/article/181187.htm

/** 实现真正的随机数组
 ** v8 在处理 sort 方法时，当目标数组长度小于 10 时，使用插入排序；反之，使用快速排序和插入排序的混合排序。
 ** 原理很简单，就是遍历数组元素，然后将当前元素与以后随机位置的元素进行交换，从代码中也可以看出，这样乱序的就会更加彻底。 
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}


// 快排  （找到中间位置，数组分两组，递归数组）O(n logn)
function quickSort(arr) {
    if (arr.length <= 1) {//如果数组只有一个数，就直接返回；  
        return arr;
    }
    var num = Math.floor(arr.length / 2);//找到中间数的索引值，如果是浮点数，则向下取整  
    var middleValue = arr.splice(num, 1);//找到中间数的值  
    var left = [], right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < middleValue) {
            left.push(arr[i]);//基准点的左边的数传到左边数组  
        } else {
            right.push(arr[i]);//基准点的右边的数传到右边数组  
        }
    }
    return quickSort(left).concat(middleValue, quickSort(right));//递归不断重复比较  
}
console.log(quickSort([21, 45, 5, 12, 56, 8, 9]));//[5, 8,9,12, 21, 45, 56]  
/**
 * 原地快排，不占用额外空间，原地交换数据完成
 * 
 * */
//冒泡排序 （双层for循环 位置交换）O(n^2)
function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var temNum = arr[i];
                arr[i] = arr[j];
                arr[j] = temNum;
            }
        }
    }
    return arr;
}
console.log(bubbleSort([21, 45, 5, 12, 56, 8, 9]))

// 插入排序 （很少考到）O(n^2)
function insertSort(arr) {
    var len = arr.length;
    for (var i = 1; i < len; i++) {
        var temp = arr[i];
        var j = i - 1;//默认已排序的元素
        while (j >= 0 && arr[j] > temp) {  //在已排序好的队列中从后向前扫描
            arr[j + 1] = arr[j]; //已排序的元素大于新元素，将该元素移到一下个位置
            j--;
        }
        arr[j + 1] = temp;
    }
    return arr
}
console.log(insertSort([21, 45, 5, 12, 56, 8, 9]))
