import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import store from '@/store'; //导入我们刚刚创建的 Redux 商店
import RoutesUi from "@/routes";



if (process.env.NODE_ENV !== "production") {
  require("@/mock"); // 接口拦截需要引入 mock
}
if (process.env.NODE_ENV === "production") {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
        // console.log('成功: ', registration);
      }).catch(registrationError => {
        // console.log('失败: ', registrationError);
      });
    });
  }
}

ReactDom.render(
  /**
   * 1. Provider 在根组件外面包了一层 所有子组件都能默认拿到state tip: 它的原理是React组件的context属性 store放在了上下文对象context上面
   * 2. 建立起store store传递给所有子组件
   */
  <Provider store={store}>
    <RoutesUi />
  </Provider>
  ,
  document.querySelector("#root"));
