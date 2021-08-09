import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";

// tip: react-router-dom 使用router 需要在devServer 添加 inline: true, historyApiFallback: true 否则不支持URl 输入

const RouteGroup = [
  {
    path: '/home',
    component: 'home',
  },
  {
    path: '/role',
    component: 'role',
  },
  {
    path: '/user',
    component: 'user',
  },
  {
    path: '/work',
    component: 'work',
  },
];

export default class Routers extends Component {

  render() {
    return (
      <div>

        <Router>
          {
            RouteGroup.map((item, index) => {
              return (
                <NavLink key={item.path || index + 1} to={item.path}>
                  {
                    item.path
                  }
                </NavLink>
              )
            })
          }
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" render={() => (
                <Redirect to="/home" />
              )} />
              {
                RouteGroup.map((item, index) => {
                  return (
                    <Route
                      key={item.path || index + 1}
                      exact={true}
                      path={item.path}
                      // webpack.config @babel/plugin-syntax-dynamic-import 解析动态 import 语法
                      component={lazy(() => import(`./pages/${item.component}`))}
                    />
                  );
                })
              }
              <Route path="*" render={() => (
                "404"
              )} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}
