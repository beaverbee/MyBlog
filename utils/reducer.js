import { GET_CITY, SET_VISIT } from "./constant";

//如果想实现多reducer的管理 store的数据名称要和 reducer的名称一致
export const store = {
  user: { name: "", level: -1 },
  params: { key: "key", city: "M78星云", firstVisit: true },
};

//user Reducer
const user = (state, action) => {
  switch (action.type) {
    case "retrive":
      return { ...state, name: action.value };
    case "remove":
      return { ...state, level: action.value };
  }
};

const params = (state, action) => {
  switch (action.type) {
    case "retrive":
      return { ...state, key: action.value };
    case GET_CITY:
      return { ...state, city: action.value };
    case SET_VISIT:
      return { ...state, firstVisit: action.value };
  }
};

//combine reducer
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
