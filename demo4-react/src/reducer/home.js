import { ArrResetObj } from "@/utils/way";

export const { GET_LIST } = ArrResetObj(['GET_LIST'], "home");

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
};
