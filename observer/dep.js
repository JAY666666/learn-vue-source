/*
抽象收集的依赖类
依赖的方法
*/

export default class Dep {
  constructor() {
    this.subs = [];
  }

  // 添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }

  // 删除依赖
  removeSub(sub) {
    remove(this.subs, sub);
  }

  // 如果存在依赖将其添加
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }

  // 依赖变化循环依赖数组并为其更新
  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
