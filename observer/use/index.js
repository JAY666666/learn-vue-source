import Observer from "../index.js";
import Watcher from "../watcher.js";


let data = {
  tall: 173,
  age: 27,
  lists: [1, 2, 3],
};
new Observer(data);

Object.keys(data).forEach((item) => addWatcher(data, item));

function addWatcher(data, key) {
  return new Watcher(data, key, function (val, oldValue) {
    console.log("老数据", oldValue, "=>", "新数据", val, "=>");
  });
}

window.changeTall = function changeTall() {
  data.tall++;
  document.getElementById("tall").innerHTML = data.tall;
};

window.changeAge = function changeAge() {
  data.age--;
  document.getElementById("age").innerHTML = data.age;
};

window.changeArray = function changeArray() {
  data.lists.push(data.lists.length + 1);
  document.getElementById("array").innerHTML =
    data.lists[data.lists.length - 1];
};
