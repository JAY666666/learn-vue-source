/*
抽象收集的依赖类
依赖的方法
*/
let id = 0;
export default class Dep {
  constructor() {
    this.subs = [];
    this.id = id++;
  }
  
  //添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }

  // 删除依赖
  removeSub(sub) {
    const index = this.subs.indexOf(sub);
    if (index > -1) {
      this.subs.splice(index, 1);
    }
  }

  // 如果存在依赖将其添加
  depend() {
    if (window.target) {
      window.target.addDep(this); //把去重依赖判断放在了watcher里
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
