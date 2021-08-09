import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { createSelector } from 'reselect'; // 列子使用: 并未下载

import { GET_LIST } from '@/reducer/work';

/**
 * 1. redux-hook 只能在函数组件体内部调用
 */

/**
 * 列子1
 * 基础使用
 */
export default function work() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_LIST,
      test: "测试",
    });
  }, []);
  const result = useSelector(({ work }) => work);
  console.log(result, 9);

  return (
    <div>
      work
      <br></br>
    </div>
  );
}


/**
 * 列子2
 * 当一个 selector 函数依赖于某个 状态(state) 时，确保函数声明在组件之外，这样就不会导致相同的 selector 函数在每一次渲染时都被重复创建
 */
// const selectNumOfDoneTodos = createSelector(
//   (state) => {
//     // console.log(state, 'createSelector11111');
//     return state.demo2;
//   },
//   (state) => {
//     // console.log(state, 'createSelector22222');
//     return state;
//   },
// )
// export default function work() {
//   const result = useSelector(selectNumOfDoneTodos);
//   return (
//     <div>
//       work
//       <br></br>
//     </div>
//   );
// }


/**
 * 列子3
 * 当一个 selector 函数依赖于某个 状态(props) 时，确保函数声明在组件之外，这样就不会导致相同的 selector 函数在每一次渲染时都被重复创建
 */
// const selectNumOfDoneTodos = createSelector(
//   (state, props) => {
//     // console.log(state, props, 'createSelector11111');
//     return state.demo2;
//   },
//   (state, props) => {
//     // console.log(state, props, 'createSelector22222');
//     return props;
//   },
//   (state, props) => {
//     // console.log(state, props, 'createSelector333');
//     return state;
//   },
// )
// export default function work() {
//   const result = useSelector(state => selectNumOfTodosWithIsDoneValue(state, { send: "data" }));
//   return (
//     <div>
//       work
//       <br></br>
//     </div>
//   );
// }