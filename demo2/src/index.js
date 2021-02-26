import "./index.less";

function component() {
  var element = document.createElement('pre');

  element.innerHTML = ['sample', 'webpack', "1233"].join('\n\n');

  return element;
}

let element = component(); // 当 index.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./index.js', function () {
    console.log("监听热: print");
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })
}
