
/** 
    队列是一种特殊的线性表，其特殊之处在于，它值允许你在队列的头部删除元素，在队列的末尾添加元素（先进先出）
    方法
    1. enqueue从队列的尾部添加一个元素
    2. dequeue从队列的头部删除一个元素
    3. head 返回头部元素，注意，不是删除
    4. size返回队列大小
    5. clear清空队列 
    6. isEmpty判断队列是否为空
    7. tail返回队列尾节点
*/

function Queue() {
    var items = []; //存储数据
    this.enqueue = function (item) {
        items.push(item)
    }
    this.dequeue = function () {
        return items.shift()
    }
    this.head = function () {
        return items[0]
    }
    this.tail = function () {
        return items[items.length - 1]
    }
    this.size = function () {
        return items.length;
    }
    this.clear = function () {
        items = []
    }
    this.isEmpty = function () {
        return items.length == 0;
    }
}
//约瑟夫环 
/* 有一个数组a[100]存放0-99，要求每隔两个数删掉一个数，到末尾循环开头继续进行，求最后一个被删除的数*/
function del_ring(arr_list) {
    var queue = new Queue();
    for (var i = 0; i < arr_list.length; i++) {
        queue.enqueue(arr_list[i])
    }
    var index = 0;
    while (queue.size() != 1) {
        // 弹出一个元素，判断是否需要删除
        var item = queue.dequeue();
        index += 1;
        // 每隔2个元素就要删除一个，那么不是被删除的元素就要被放回到队列尾部
        if (index % 3 != 0) {
            queue.enqueue(item)
        }
    }
    return queue.head()
}
var i = 0;
var arr_list = Array.from({ length: 100 }).map(() => i++)
console.log(del_ring(arr_list));
