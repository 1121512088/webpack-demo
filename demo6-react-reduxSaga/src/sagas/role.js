import { takeEvery, call, put } from "redux-saga/effects";
import Api from "@/toolkit/request";
import { types } from '@/reducer/role';

function* role({ payload = {} }) {

  // const res = call(fn, ...arg); call 方法不兼容 Api方法
  const res = yield Api.post('/role_list', { data: payload });

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

export default function* watchRole() {
  yield takeEvery([types.GET_LIST_REQUEST], role);
}
