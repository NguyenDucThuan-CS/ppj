import * as ActionType from "./constant";



export const actAddData = (payload) => {
  return {
    type: ActionType.ADD_DATA,
    payload: payload
  };
};

;

export const actDeleteData = (payload) => {
  return {
    type: ActionType.DELETE_DATA,
    payload: payload
  };
};

export const actEditData = (payload) => {
  return {
    type: ActionType.EDIT_DATA,
    payload: payload
  };
};