import { combineReducers } from "redux";
import home from "./home";
import role from "./role";
import user from "./user";

/**
 * 1. combineReducers: 所有reducer合并为一个reducer
 * 2. 页面使用 connect() 最关键的点在于
 * connect( 4个参数
 *  [mapStateToProps 这个函数允许我们将 store 中的数据作为 props 绑定到组件上], 列子在home page
 *   mapStateToProps: ([state 所有的reducer], [nowProps 组件现在的props]) => ({})
 *  [mapDispatchToProps 参数可以是{} || fn, 该方法相当于代替了dispatch], 列子在role page
 *  [mergeProps 控制传给组件 props], 列子在user page
 *  [options] 若发生组件不更新的问题，可以考虑关闭默认的浅比较，connect(null, null, null, {pure: false});
 *   options 2个参数
 *    1. pure = (default true) true: connector 将执行shouldComponentUpdate 并且浅对比 mergeProps 的结果
 *    2. withRef = (default false) true: connector 会保存一个对被被包含的组件实例的引用，该引用通过 getWrappedInstance() 方法获得。默认值为 false
 * )
 */

export default combineReducers({
  home,
  role,
  user,
});
