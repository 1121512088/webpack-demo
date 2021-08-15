import { createStore, applyMiddleware } from "redux";
import saga from 'redux-saga';
import reducer from "@/reducer";
import rootSaga from "@/sagas";

/**
 * 1. createStore([reducer], [initialStore 即初始化的store]) 建立起store
 * 2. createStore 第二个参数直接设置中间件,该方法内部默认会处理第二个参数undefined
 * 3. appltMiddleware 中间件函数
 * 4. github redux-devtools-extension 增加 redux devtools开发工具
 * 5. redux-saga
 */

const isPro = process.env.NODE_ENV === "production";
const createSaga = saga();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middleware = applyMiddleware(
  createSaga,
);
if (!isPro) {
  middleware = composeEnhancers(middleware);
}
const store = createStore(reducer, middleware);
createSaga.run(rootSaga); // 必须 createStore()挂载到Store之后 才能 run saga

export default store;
