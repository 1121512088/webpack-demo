import { ArrResetObj } from "@/utils/way";

export const types = ArrResetObj([
  'GET_LIST_REQUEST',
  'GET_LIST_SUCCESS',
  'GET_LIST_FAILED',
], "ROLE");

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
      list: action?.result?.results,
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
      types: [types.GET_LIST_REQUEST, types.GET_LIST_SUCCESS, types.GET_LIST_FAILED],
      payload: { url: '/role_list', method: 'POST', data: params },
    };
  }
};
