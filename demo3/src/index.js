import styles from "./index.less";
import _ from "lodash";

let count = 9;

function component() {
  var element = document.createElement('pre');

  element.innerHTML = ['sample123', 'webpack', "123456333", "行吧32"].join('\n\n');
  element.className = `${styles.sample} demo`;
  ++count;
  element.onclick = () => {
    element.innerHTML = count;
  }
  return element;
}

document.body.appendChild(component());

// if (module.hot) {
//   module.hot.accept('./index.js', function () {
//     console.log("监听热: print");
//     document.body.removeChild(element);
//     element = component(); // 重新渲染页面后，component 更新 click 事件处理
//     document.body.appendChild(element);
//   })
// }
