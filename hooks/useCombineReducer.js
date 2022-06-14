import { GET_CITY, SET_VISIT, LOGIN, REGISTER, SET_LOADING } from "../config";
import { useReducer } from "react";

const store = {
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
      return { ...state, level: action.value };
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

export function useCombineReducer() {
  const userReducer = useReducer(user, store.user);
  const paramsReducer = useReducer(params, store.params);
  return [userReducer, paramsReducer];
}
