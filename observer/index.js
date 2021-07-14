import { arrayMethods } from "./array.js";
import Dep from "./dep.js";
import { isObject, def } from "./utils.js";

const hasProto = "_proto_" in {}; // 判断浏览器是否支持_proto_
const arrayKeys = Object.getOwnPropertyNames(arrayMethods); //获取数组方法名keys

export default class Observer {
  constructor(value) {
    this.value = value; //观测的数据

    this.dep = new Dep(); //存放数组依赖
    def(value, "_ob_", this); //新增一个不可枚举的属性"_ob_",值为当前observer,可以作为判断是否是响应式数据
    if (Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment; //对浏览器是否支持_proto_做处理
      augment(value, arrayMethods, arrayKeys); // 把数据的_proto_属性设置为拦截器arratMethods方法
      this.observeArray(value)
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  // 递归判断数组的子项
  observeArray(items) {
    for(let i=0;i<items.length;i++){
      observe(items[i])
    }
  }
}

//定义响应式方法 通过Object.defineProperty()
function defineReactive(data, key, val) {
  let childOb = observe(val); //尝试为val创建一个observer实例，如果有的话则返回就好了
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get: function () {
      dep.depend();
      if (childOb) {
        childOb.dep.depend();
      }
      return val;
    },
    set: function (newVal) {
      if (newVal == val) {
        return;
      }
      val = newVal;
      dep.notify();
    },
  });
}

// 判断是否为observer实例,只有为object类型的才做判断
function observe(value) {
  if (!isObject(value)) return;
  let ob;
  if (Object.hasOwnProperty(value, "_ob_") && value._ob_ instanceof observer) {
    //判断是否是observer实例，是的话实例本身
    ob = value._ob_;
  } else {
    ob = new Observer(value); // 否的话新增实例
  }
  return ob;
}

// 如果浏览器支持_proto_ 直接把arrayMethods拦截器方法添加到_proto_
function protoAugment(target, src, keys) {
  target._proto_ = src;
}

// 如果浏览器不支持_proto_ 
function copyAugment(target, src, keys) {
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}
