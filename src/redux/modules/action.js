import * as ActionType from "./constant";



export const actAddItem = (payload) => {
  return {
    type: ActionType.ADD_ITEM,
    payload: payload
  };
};

export const actEditItem = (data) => {
  return {
    type: ActionType.EDIT_ITEM,
    payload: data,
  };
};

export const actDeleteItem = (payload) => {
  return {
    type: ActionType.DELETE_ITEM,
    payload: payload
  };
};