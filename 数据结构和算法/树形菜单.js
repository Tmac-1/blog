
// js 生成树形菜单
// https://blog.csdn.net/u013373006/article/details/82108873"
// https://zhidao.baidu.com/question/1511885715203308100.html 节点查找 

var data = [
    { id: 1, name: "办公管理", pid: 0 },
    { id: 2, name: "请假申请", pid: 1 },
    { id: 3, name: "出差申请", pid: 1 },
    { id: 4, name: "请假记录", pid: 2 },
    { id: 5, name: "系统设置", pid: 0 },
    { id: 6, name: "权限管理", pid: 5 },
    { id: 7, name: "用户角色", pid: 6 },
    { id: 8, name: "菜单设置", pid: 6 },
]
function toTree(data) {
    var map = {};
    data.forEach(item => {
        map[item.id] = item;
    });
    var val = [];
    data.forEach(item => {
        var parent = map[item.pid]; // 利用定义map对象对应的value对象是个引用类型
        if (parent) {
            (parent.children || (parent.children = [])).push(item)
        } else {
            val.push(item)
        }
    })
    // console.log(map)
    return val;
}
console.log(toTree(data))


function toTree2(data, parent) {
    let temp = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].pid === parent) {
            temp.push(data[i])
            data[i].children = toTree2(data, data[i].id) //返回值是一个数组，又赋值给data[i].children
        }
    }
    return temp
}
console.log(toTree2(data, 0))

// var a = [{ "id": "0000", "text": "R1", "children": [{ "id": "8978", "text": "Aad", "children": [{ "id": "2312",
// "text": "adaada", "children": [{ "id": "5154", "text": "asdsa" }] }, { "id": "4544", "text": "afasf", "children": [{
// "id": "5236", "text": "afasf" }, { "id": "2328", "text": "afasf" }] }] }, { "id": "7867", "text": "R2", "children":
// [{ "id": "8767", "text": "afasf", "children": [{ "id": "2016", "text": "afafa" }, { "id": "2017", "text": "afasd" }]
// }, { "id": "7657", "text": "h", "children": [{ "id": "7867", "text": "afras" }] }] }] }];
var a = [{
    "id": "0000",
    "text": "R1",
    "children": [
        {
            "id": "8978",
            "text": "Aad",
            "children": [{
                "id": "2312",
                "text": "adaada",
                "children": [{
                    "id": "5154",
                    "text": "asdsa"
                }]
            }, {
                "id": "4544",
                "text": "afasf",
                "children": [{
                    "id": "5236",
                    "text": "afasf"
                }, {
                    "id": "2328",
                    "text": "afasf"
                }]
            }]
        },
        {
            "id": "7867",
            "text": "R2",
            "children": [{
                "id": "8767",
                "text": "afasf",
                "children": [{
                    "id": "2016",
                    "text": "afafa"
                }, {
                    "id": "2017",
                    "text": "afasd"
                }]
            }, {
                "id": "7657",
                "text": "h",
                "children": [{
                    "id": "7867",
                    "text": "afras"
                }]
            }]
        }]
},
{
    id: "0001",
    text: '哈哈哈哈哈',
    children: [{
        id: "1213",
        text: 'adfasfas'
    }]
}]
// 返回数组（递归）
let res = []
function toArray(node, id) {
    node.forEach(item => {
        let obj = {};
        obj.id = item.id;
        obj.text = item.text;
        obj.pid = id || null;
        res.push(obj)
        if (item.children) {
            toArray(item.children, item.id)
        }
    })
}
toArray(a)
console.log('res', res)

// 查找节点（递归） 
var json = [];
function findChild(initData, id) {
    for (var i = 0; i < initData.length; i++) {
        if (initData[i].id == id) {
            json.push(initData[i])
        } else {
            if (initData[i].hasOwnProperty('children')) {
                findChild(initData[i].children, id)
            }
        }
    }
}
findChild(a, "1213");
console.log(json)
