import { combineReducers } from "redux";
import home from "./home";
import role from "./role";
import user from "./user";

/**
 * 1. combineReducers: 所有reducer合并为一个reducer
 * 2. 页面使用 connect() 最关键的点在于
 * connect(
 *  [mapStateToProps 这个函数允许我们将 store 中的数据作为 props 绑定到组件上], 列子在home page
 *  [mapDispatchToProps 参数可以是{} || fn, 该方法相当于代替了dispatch], 列子在role page
 *  [mergeProps 控制传给组件 props], 列子在user page
 *  [options] 若发生组件不更新的问题，可以考虑关闭默认的浅比较，connect(null, null, null, {pure: false});
 * )
 * mapStateToProps: ([state 所有的reducer], [nowProps 组件现在的props]) => ({})
 */

export default combineReducers({
  home,
  role,
  user,
});
