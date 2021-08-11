import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer";

/**
 * 1. createStore([reducer], [initialStore 即初始化的store]) 建立起store
 * 2. createStore 第二个参数直接设置中间件,该方法内部默认会处理第二个参数undefined
 * 3. appltMiddleware 中间件函数
 * 4. github redux-devtools-extension 增加 redux devtools开发工具
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware = composeEnhancers(applyMiddleware());

if (process.env.NODE_ENV === "production") {
  middleware = applyMiddleware();
}

export default createStore(reducer, middleware);
