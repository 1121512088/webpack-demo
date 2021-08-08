import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer";

/**
 * 1. createStore([reducer], [initialStore 即初始化的store]) 建立起store
 * 2. appltMiddleware 中间件函数
 */

export default createStore(reducer, {});
