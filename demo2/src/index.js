import _ from "Lodash";
import printMe from "./print";

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['sample', 'webpack'], ' ');

  btn.innerHTML = 'Click console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());