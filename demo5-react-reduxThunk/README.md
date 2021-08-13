基础模板使用 redux-thunk redux-logger
解决接口请求 页面loading 问题  
REQUEST > SUCCESS
REQUEST > FAILED

redux-thunk (异步流处理) action只能返回对象，使用thunk 插件使得action可以返回函数
优点： 库小，代码就几行
缺点：reducer不再是纯粹函数，直接返回对象，违背了当初的设计原则
都说redux-thunk代码臃肿 (个人觉得并不会，看个人设计原理)
