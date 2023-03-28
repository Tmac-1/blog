
/** 
 链表 
 链表是一组节点组成的集合。每个节点都使用一个对象的引用指向他的后继。指向另一个节点的引用叫做链。 
 单向链表、双向链表、循环链表
 原型链就是个链表结构
 和数组区别，数组是有序的，链表是无序的
*/

/**
* Node 类：包含2个属性，element用来保存节点上的数据，next用来指向下一个节点的链接
*/
function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

/**
* LinkedList类：LList提供了对链表操作的方法。
* 链表只有一个属性，使用一个Node对象来保存该链表的头节点。
*/
function LList() {
    this.head = new Node("head");
    this.find = find; // 遍历链表，查找指定数据
    this.insert = insert;
    this.remove = remove;
    this.findLast = findLast; // 查找链表最后一个元素
    this.dispReverse = dispReverse; //反序显示双向链表中的元素
    //    this.findPrevious = findPrevious ; // 查找之前的节点
    this.display = display; // 用来展示链表中的元素

    function find(item) {
        var currNode = this.head;
        while (currNode.element != item) {
            currNode = currNode.next;
        }
        return currNode;
    }

    //    function findPrevious(item){
    //        var currNode = this.head;
    //        while(!(currNode.next == null) && ( currNode.next.element != item ) ){
    //            currNode = currNode.next;
    //        }
    //        return currNode;
    //    }

    function findLast() {
        var currNode = this.head;
        while (!(currNode.next == null)) {
            currNode = currNode.next;
        }
        return currNode;
    }

    function dispReverse() {
        var currNode = this.head;
        currNode = this.findLast();
        while (!(currNode.previous == null)) {
            console.log(currNode.element);
            currNode = currNode.previous;
        }
    }

    function insert(newElement, item) {
        var newNode = new Node(newElement);
        var current = this.find(item);
        newNode.next = current.next;
        newNode.previous = current;
        current.next = newNode;
    }

    function remove(item) {
        //    var prevNode = this.findPrevious(item);
        //    if(!( prevNode.next == null )){
        //       prevNode.next = prevNode.next.next;
        //    }
        var currNode = this.find(item);
        if (!(currNode.next == null)) {
            currNode.previous.next = currNode.next;
            currNode.next.previous = currNode.previous;
            currNode.next = null;
            currNode.previous = null;
        }
    }

    function display() {
        var currNode = this.head;
        while (!(currNode.next == null)) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }
}

var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
cities.remove("Carlisle");
cities.display();
cities.dispReverse()
console.log('cities', cities)


// 自定义instanceOf
function instance_of(target, obj) {
    const p = target;
    while (p) {
        if (p === obj.prototype) {
            return true
        }
        p = p.__proto__; // 沿着原型链重新赋值
    }
}

instance_of([1, 2, 3], Object)

