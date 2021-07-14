import { traverse } from "./traverse.js";
import { parsePath } from "./utils.js";
export default class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    this.deep = options ? !!options.deep : false; //是否深度监听
    this.cb = cb; //回调
    this.deps = [];
    this.depIds = new Set(); // new Set()去重
    this.getter = typeof expOrFn === "function" ? expOrFn : parsePath(expOrFn); //当为function时类似于computed
    console.log(this.getter)
    this.value = this.get();
  }

  // 获取value，触发getter以收集依赖
  get() {
    window.target = this; //把自身watcher实例先存到全局的target上
    let value = this.getter(this.vm); //取值触发getter，就可以把自己存到dep中了
    if (this.deep) {
      traverse(value); // 深度监听子元素
    }
    window.target = undefined; // 然后清空
    return value; //返回获取的值
  }

  // 收集依赖
  addDep(dep) {
    if (this.depIds.has(dep.id)) return;
    this.depIds.add(dep.id);
    this.deps.push(dep);
    dep.addSub(this);
  }

  //通知变化
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this, this.value, oldValue);
  }
}
