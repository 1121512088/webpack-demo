import { all } from "redux-saga/effects";
import home from "./home";
import role from "./role";

/**
 * import { fork，call， put，takeEvery，takeLatest，all } from "redux-saga/effects";
 * fork: 创建一个新的进程或者线程，并发发送请求。yield fork(Fn* => yield, url)
 * call: 发送 api 请求
 * put: 发送对应的 dispatch，触发对应的 action
 * takeEvery: 1. 监听对应的 action；2. 每一次 dispatch 都会触发；
 * takeLatest: 1. 监听对应的 action；2. 只会触发最后一次 dispatch；
 * all: 跟 fork 一样，同时并发多个 action，没有顺序
 */

export default function* rootSaga() {
  yield all([
    home(),
    role(),
  ]);
}
