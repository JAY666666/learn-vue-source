const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);// 新建一个数组对象并继承数组原型，可得到数组的原型方法

// 数组拦截器，对能改变数组的7种方法进行拦截，在拦截器中把变化通知出去
const arrays = ["push", "shift", "unshift", "splice", "reverse", "pop", "sort"];
arrays.forEach(function (method) {
  const originMethod = arrayMethods[method]; //原生方法
  Object.defineProperty(arrayMethods, method, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: function mutator(...args) {
      const result = originMethod.apply(this, args); // 把原生方法的指向mutator，也就是说以后调用原生方法，实际调用的是mutator
      const ob = this._ob_; // 拿到obserber实例
      let inserted
      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          inserted = args.slice(2);
        default:
          break;
      }
      if (inserted) ob.observeArray(inserted);
      ob.dep.notify(); //在数组拦截器中做变化通知
      return result;
    },
  });
});
