import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger"; // redux 执行记录
import thunkExtend from "@/middleware/thunkExtend"; // 自编中间件
import reducer from "../reducer";

/**
 * 1. createStore([reducer], [initialStore 即初始化的store]) 建立起store
 * 2. createStore 第二个参数直接设置中间件,该方法内部默认会处理第二个参数undefined
 * 3. appltMiddleware 中间件函数
 * 4. github redux-devtools-extension 增加 redux devtools开发工具
 * 5. redux-logger 输出redux流
 * 6. redux-thunk (异步流处理) action只能返回对象，使用 thunk 插件使得action可以返回函数
 *    1.操作发起时的 Action 2.操作成功时的 Action 3.操作失败时的 Action
 *      写法一：名称相同，参数不同
        { type: 'FETCH_POSTS' }
        { type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
        { type: 'FETCH_POSTS', status: 'success', response: { ... } }
        写法二：名称不同
        { type: 'FETCH_POSTS_REQUEST' }
        { type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
        { type: 'FETCH_POSTS_SUCCESS', response: { ... } }
 */

const isPro = process.env.NODE_ENV === "production";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware = applyMiddleware(
  thunk,
  thunkExtend, // redux-thunk 扩展 执行3次 action
  // createLogger(), // logger就一定要放在最后，否则输出结果会不正确
);

if (!isPro) {
  middleware = composeEnhancers(middleware);
}

export default createStore(reducer, middleware);
