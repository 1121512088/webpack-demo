redux-saga 的优点：
（1）声明式 Effects：所有的操作以JavaScript对象的方式被 yield，并被 middleware 执行。使得在 saga 内部测试变得更加容易，可以通过简单地遍历 Generator 并在 yield 后的成功值上面做一个 deepEqual 测试。
（2）高级的异步控制流以及并发管理：可以使用简单的同步方式描述异步流，并通过 fork 实现并发任务。
（3）架构上的优势：将所有的异步流程控制都移入到了 sagas，UI 组件不用执行业务逻辑，只需 dispatch action 就行，增强组件复用性。
