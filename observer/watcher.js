export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb; //回调
    this.deps = [];
    this.depIds = [];
    this.expOrFn = expOrFn; //目前只考虑表达式 不考虑函数
    this.value = this.get();
  }

  // 获取value，触发getter以收集依赖
  get() {
    window.target = this; //把自身watcher实例先存到全局的target上
    let value = this.vm[this.expOrFn]; //取值触发getter，就可以把自己存到dep中了
    window.target = undefined; // 然后清空
    return value; //返回获取的值
  }

  // 收集依赖
  addDep(dep) {
    if (this.depIds.includes(dep.id)) return;
    this.depIds.push(dep.id);
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
