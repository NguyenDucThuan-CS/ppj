import * as ActionType from "./constant";

const initialState = {
  masterData: [
    {
      Id: 1,
      No: 1,
      ItemName: "Fiber (bông)",
      TypeName: "Product",
      ParentId: null,
    },
    {
      Id: 2,
      No: 2,
      ItemName: "Spinning - services",
      TypeName: "Service (Dịch vụ)",
      ParentId: 1,
    },
    {
      Id: 3,
      No: 3,
      ItemName: "Spinning - materials",
      TypeName: "Supplement Material (Phụ liệu)",
      ParentId: 1,
    },
    {
      Id: 4,
      No: 4,
      ItemName: "Yarn (sợi)",
      TypeName: "Product",
      ParentId: null,
    },
    {
      Id: 5,
      No: 5,
      ItemName: "Weaving - services",
      TypeName: "Service (Dịch vụ)",
      ParentId: 4,
    },
    {
      Id: 6,
      No: 6,
      ItemName: "Weaving - materials",
      TypeName: "Supplement Material (Phụ liệu)",
      ParentId: 4,
    },
    {
      Id: 7,
      No: 7,
      ItemName: "Greige Fabric (vải mộc)",
      TypeName: "Product",
      ParentId: null,
    },
    {
      Id: 8,
      No: 8,
      ItemName: "Dyeing - services",
      TypeName: "Service (Dịch vụ)",
      ParentId: 7,
    },
    {
      Id: 9,
      No: 9,
      ItemName: "Dyeing - materials",
      TypeName: "Supplement Material (Phụ liệu)",
      ParentId: 7,
    },
    {
      Id: 10,
      No: 10,
      ItemName: "Color Fabric (vải màu)",
      TypeName: "Product",
      ParentId: null,
    },
    {
      Id: 11,
      No: 11,
      ItemName: "Cutting - services",
      TypeName: "Service (Dịch vụ)",
      ParentId: 10,
    },
    {
      Id: 12,
      No: 12,
      ItemName: "Cutting - materials",
      TypeName: "Supplement Material (Phụ liệu)",
      ParentId: 10,
    },
    {
      Id: 13,
      No: 13,
      ItemName: "Sewing - services",
      TypeName: "Service (Dịch vụ)",
      ParentId: 10,
    },
    {
      Id: 14,
      No: 14,
      ItemName: "Sewing - materials",
      TypeName: "Supplement Material (Phụ liệu)",
      ParentId: 10,
    },
    {
      Id: 15,
      No: 15,
      ItemName: "Washing - services",
      TypeName: "Service (Dịch vụ)",
      ParentId: 10,
    },
    {
      Id: 16,
      No: 16,
      ItemName: "Washing - materials",
      TypeName: "Supplement Material (Phụ liệu)",
      ParentId: 10,
    },
    {
      Id: 17,
      No: 17,
      ItemName: "Finishing - services",
      TypeName: "Service (Dịch vụ)",
      ParentId: 10,
    },
    {
      Id: 18,
      No: 18,
      ItemName: "Finishing - materials",
      TypeName: "Supplement Material (Phụ liệu)",
      ParentId: 10,
    },
    {
      Id: 19,
      No: 19,
      ItemName: "Garment (trang phục)",
      TypeName: "Product",
      ParentId: null,
    },
  ],
};

const masterDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_DATA:
      const index = state.masterData.findIndex(
        (item) =>
          item.Id !== action.payload.ParentId &&
          item.ParentId !== action.payload.ParentId
          && item.Id > action.payload.ParentId
      );
      state.masterData.splice(index, 0, {
        Id: state.masterData[index - 1].Id + 1,
        No: state.masterData[index - 1].Id + 1,
        ...action.payload,
       
      });
   
      for (let i = index + 1; i < state.masterData.length; i++) {
        state.masterData[i].Id = state.masterData[i].Id + 1;
        state.masterData[i].No = state.masterData[i].No + 1;

      }
      return { ...state };
    case ActionType.DELETE_DATA:
      const id = action.payload;
      const index1 = state.masterData.findIndex((item) => item.Id === id)
      state.masterData = state.masterData.filter((item) => item.Id !== id);
      for (let i = index1; i < state.masterData.length; i++) {
        state.masterData[i].Id = state.masterData[i].Id - 1;
        state.masterData[i].No = state.masterData[i].No - 1;

      }
      return { ...state };
    case ActionType.EDIT_DATA:
      const index2 = state.masterData.findIndex((item) => item.Id === action.payload.id)
      state.masterData[index2].ItemName = action.payload.name
      state.masterData[index2].TypeName = action.payload.type
      return { ...state };
    default:
      return { ...state };
  }
};

export default masterDataReducer;
