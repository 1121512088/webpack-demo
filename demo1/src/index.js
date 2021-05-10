import _ from "Lodash";
import "./style.less";
import Icon from './use.png';

// npm run build 后 看 dist/index.html 文件

function component() {
  const element = document.createElement('div');

  // lodash，现在通过一个 script 引入
  element.innerHTML = _.join(['sample', 'webpack'], ' ');
  element.classList.add('hello');

  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());