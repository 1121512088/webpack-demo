import _ from "Lodash";
import "./style.less";
import Icon from './use.png';

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