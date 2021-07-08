import Observer from "./observer.js";
import Watcher from "./watcher.js";

let data = {
  tall: 173,
  age: 27
};
new Observer(data);

window.changeTall = function changeTall() {
  data.tall++;
  document.getElementById("tall").innerHTML = data.tall;
  new Watcher(data, "tall", function (val, oldValue) {
    console.log("老数据", oldValue, "=>", "新数据", val, "=>");
  });
};

window.changeAge = function changeAge() {
  data.age--;
  document.getElementById("age").innerHTML = data.age;
  new Watcher(data, "age", function (val, oldValue) {
    console.log("老数据", oldValue, "=>", "新数据", val, "=>");
  });
};
