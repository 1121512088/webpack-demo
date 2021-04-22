import styles from "./index.less";
import _ from "lodash";
console.log(styles, 1);
function component() {
  var element = document.createElement('pre');

  element.innerHTML = ['sample123', 'webpack', "123456333"].join('\n\n');
  element.className = `${styles.sample} demo`;
  element.onclick = () => {
    document.querySelector(".div").style.display = "block";
  }
  return element;
}

let element = component(); // 当 index.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);
document.body.appendChild(
  (() => {
    var element = document.createElement('div');

    element.innerHTML = ["测试"].join('\n\n');
    element.className = `div`;
    element.style.display = "none";
    return element;
  })()
);

// if (module.hot) {
//   module.hot.accept('./index.js', function () {
//     console.log("监听热: print");
//     document.body.removeChild(element);
//     element = component(); // 重新渲染页面后，component 更新 click 事件处理
//     document.body.appendChild(element);
//   })
// }
