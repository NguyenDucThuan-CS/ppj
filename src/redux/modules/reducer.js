import * as ActionType from "./constant";

const initialState = {
  data: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_ITEM:
      state.data = [...state.data, action.payload]
      return { ...state };
    case ActionType.DELETE_ITEM:
      const id = action.payload
      state.data = state.data.filter((item) => item.id !== id)
      return { ...state };
    case ActionType.EDIT_ITEM:
      const editItem = action.payload
      const index = state.data.findIndex((item) => item.id === editItem.id)

      state.data[index].sourceID = editItem.sourceID
      state.data[index].desID = editItem.desID
      state.data[index].cost = editItem.cost


      return { ...state };

    default:
      return { ...state };
  }
};

export default itemReducer;