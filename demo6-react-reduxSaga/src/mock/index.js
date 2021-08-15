import mock from "mockjs";
import config from "@/toolkit/projectConfig";

import home from "./home";
import role from "./role";

let obj = {};
[
  // add mock
  home, role
].forEach(v => {
  obj = { ...obj, ...v };
});

function mockData(url, method = "GET", ...opt) {
  mock.mock(`${config.getHostUrl}${url}`, method, ...opt);
}

Object.entries(obj).forEach(v => {
  const sV = v[0].split("  ");
  const url = sV[1];
  const method = sV[0] || '';
  mockData(url, method.toLowerCase(), v[1]);
});
