import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GET_LIST } from '@/reducer/work';

/**
 * 1. redux-hook 只能在函数组件体内部调用
 */

export default function work1() {
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
};
