
// 小顶堆
class MinHeap {
    public heap = <any>[]
    // 交换元素
    private swap(pid: number, cid: number) {
        [this.heap[pid], this.heap[cid]] = [this.heap[cid], this.heap[pid]]
    }
    // 找到父节点
    private getParentIndex(index: number) {
        return Math.floor((index - 1) / 2)
    }
    // 获取左子节点
    private getLeftIndex(index: number) {
        return index * 2 + 1
    }
    // 获取右子节点
    private getRightIndex(index: number) {
        return index * 2 + 2
    }
    // 上浮
    up(index: number) {
        if (index === 0) return
        const parentIndex = this.getParentIndex(index)
        // 如果父元素大于当前元素，就开始移动
        if (this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index)
            this.up(parentIndex)
        }
    }
    // 下沉
    down(index: number) {
        const leftIndex = this.getLeftIndex(index)
        const righIndex = this.getRightIndex(index)
        if (this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index)
            this.down(leftIndex)
        }
        if (this.heap[righIndex] < this.heap[index]) {
            this.swap(righIndex, index)
            this.down(righIndex)
        }
    }
    // 添加元素
    insert(value: any) {
        this.heap.push(value)
        this.up(this.heap.length - 1)
    }
    // 删除堆顶
    pop() {
        this.heap[0] = this.heap.pop()
        this.down(0)
    }
    // 获取堆顶
    peek() {
        return this.heap[0]
    }
    size() {
        return this.heap.length
    }
}

let arr = new MinHeap()
arr.insert(5)
arr.insert(4)
arr.insert(6)
arr.insert(1)
arr.pop()
console.log(arr)

/**
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素
 * [3,2,1,5,6,4], k = 2
 * */
var findKthLargest = function (nums, k) {
    let arr = new MinHeap()
    nums.forEach(item => {
        arr.insert(item)
        if (arr.size() > k) {
            arr.pop()
        }
    })
    return arr.peek()
}

export { }