import Api from "@/toolkit/request";

/**
 * redux-thunk 扩展 执行3次 action
 */
export default ({ getState }) => next => action => {
  const { types, payload, ...params } = action;
  const [REQUEST, SUCCESS, FAILED] = types;
  const { url, method = 'get', data } = payload;

  // REQUEST
  next({ ...params, type: REQUEST });

  try {
    Api[method.toLowerCase()](url, { data }).then(res => {
      if (res.success) {
        // SUCCESS
        return next({ ...params, type: SUCCESS, result: res?.data || {} });
      } else {
        // FAILED
        return next({ ...params, type: FAILED, result: {} });
      }
    });
  } catch (e) {
    console.error("thunkExtend.js文件出错");
  }
};
