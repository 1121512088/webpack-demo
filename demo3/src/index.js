import styles from "./index.less";
import _ from "lodash";
import axios from 'axios';

let count = 9;

function component() {
  var element = document.createElement('pre');

  element.innerHTML = ['sample123', 'webpack', '123456333', '行吧32'].join('\n\n');
  element.className = `${styles.sample} demo`;
  ++count;
  element.onclick = () => {
    element.innerHTML = count;
  };

  var element2 = document.createElement('pre');
  element2.innerHTML = "element2";
  element2.className = `${styles.element2}`;
  element.appendChild(element2);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
        // console.log('成功: ', registration);
      }).catch(registrationError => {
        // console.log('失败: ', registrationError);
      });
    });
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
