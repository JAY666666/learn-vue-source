export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb; //回调
    this.expOrFn = expOrFn //目前只考虑表达式 不考虑函数
    this.value = this.get();
  }

  get() {
    window.target = this; //把自身watcher实例先存到全局的target上
    let value = this.vm[this.expOrFn]; //取值触发getter，就可以把自己存到dep中了
    window.target = undefined; // 然后清空
    return value; //返回获取的值
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this, this.value, oldValue);
  }
}
