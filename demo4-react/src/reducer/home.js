import { ArrResetObj } from "@/utils/way";

const { GET_LIST } = ArrResetObj(['GET_LIST'], "home");
export {
  GET_LIST
};

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
