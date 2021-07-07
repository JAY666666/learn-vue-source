import Dep from "./dep.js";

export default class Observer {
    constructor(value){
        this.value = value
        if(!Array.isArray(value)){
            this.walk(value)
        }
    }

    walk (obj) {
        const keys = Object.keys(obj)
        for(let i=0;i<keys.length;i++){
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}

function defineReactive(data,key,val) {
    // 如果子属性也是object,递归调用
    if(typeof val === "object"){
        new Observer(val)
    }
    let dep = new Dep();
    Object.defineProperty(data, key, {
        get: function() {
            dep.depend()
            return val
        },
        set: function(newVal) {
          if(newVal == val) {
              return
          }
          val = newVal
          dep.notify();
        }
    }) 
}