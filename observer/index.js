import Observer from "./observer.js";
import Watcher from "./watcher.js";

let data = {
  number: Math.random(),
};

window.getNumber =  function getNumber() {
  data.number = Math.random();
  document.getElementById("number").innerHTML = data.number;
}

new Observer(data)
new Watcher(data,"number", function(val, oldValue) {
  console.log('老数据',oldValue,'=>','新数据',val,'=>')
})