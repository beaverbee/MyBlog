/**
 * 该文件用于配置store和相应的reducer
 * 如果想实现多reducer的管理 store的数据名称要和 reducer的名称一致
 */

import { GET_CITY, SET_VISIT, LOGIN, REGISTER, SET_LOADING } from "../config";

export const store = {
  user: { name: "", level: -1 },
  params: { key: "key", city: "M78星云", firstVisit: true, spinning: false },
};

//user reducer
const user = (state, action) => {
  switch (action.type) {
    case "retrive":
      return { ...state, name: action.value };
    case "remove":
      return { ...state, level: action.value };
    case LOGIN:
      return 1;
    case REGISTER:
      return 1;
  }
};

// params reducer
const params = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, spinning: action.value };
    case GET_CITY:
      return { ...state, city: action.value };
    case SET_VISIT:
      return { ...state, firstVisit: action.value };
  }
};

//combine reducers
const combineReducers = (reducers) => {
  return function (state, action) {
    return Object.keys(reducers)
      .map((k) => ({
        [k]: reducers[k](state[k], action),
      }))
      .reduce((prev, cur) => Object.assign({}, prev, cur));
  };
};

export const reducers = combineReducers({ user, params });
