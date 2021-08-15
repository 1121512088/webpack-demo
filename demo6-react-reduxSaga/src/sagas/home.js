import { takeEvery, call, put } from "redux-saga/effects";
import Api from "@/toolkit/request";
import { types } from '@/reducer/home';

function* home({ payload = {} }) {

  // const res = call(fn, ...arg); call 方法不兼容 Api方法
  const res = yield Api.get('/home_list', { data: payload });

  if (res.success) {
    yield put({
      type: types.GET_LIST_SUCCESS,
      payload: res.data,
    });
  } else {
    yield put({
      type: types.GET_LIST_FAILED,
      payload: res.data,
    });
  }
}

export default function* watchHome() {
  /**
   * takeEvery(string || [], 监听home)
   */
  yield takeEvery([types.GET_LIST_REQUEST], home);
}
