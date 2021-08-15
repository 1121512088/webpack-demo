import { ArrResetObj } from "@/utils/way";

export const types = ArrResetObj([
  'GET_LIST_REQUEST',
  'GET_LIST_SUCCESS',
  'GET_LIST_FAILED',
], "HOME");

const initialState = {
  loading: false,
  list: [],
};

export default (state = initialState, action) => {
  const nState = {
    [types.GET_LIST_REQUEST]: {
      loading: true,
    },
    [types.GET_LIST_SUCCESS]: {
      loading: false,
      list: action?.payload?.list,
    },
    [types.GET_LIST_FAILED]: {
      loading: false,
    },
  }[action.type];
  return { ...state, ...nState };
};

export const mapDispatchToProps = {
  findAll: (params = {}) => {
    return {
      type: types.GET_LIST_REQUEST,
      payload: params,
    };
  }
};
