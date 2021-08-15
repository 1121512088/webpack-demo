基础模板使用 redux-thunk redux-logger
解决接口请求 页面loading 问题  
REQUEST > SUCCESS
REQUEST > FAILED

redux-thunk (异步流处理) action只能返回对象，使用thunk 插件使得action可以返回函数
redux-thunk 的缺点：
（1）action 虽然扩展了，但因此变得复杂，后期可维护性降低；
（2）thunks 内部测试逻辑比较困难，需要mock所有的触发函数；
（3）协调并发任务比较困难，当自己的 action 调用了别人的 action，别人的 action 发生改动，则需要自己主动修改；
（4）业务逻辑会散布在不同的地方：启动的模块，组件以及thunks内部。
优点： 库小，代码就几行

都说redux-thunk代码臃肿 (个人觉得并不会，看个人设计原理)
