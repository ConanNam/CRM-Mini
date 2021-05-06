import * as Action from '../actions/actionType';

const initStateCustomData = {
  dataCustom: [],
};

export default eaReducer = (state = initStateCustomData, action) => {
  switch (action.type) {
    case Action.FETCH_CUSTOMDATA_SUCCESS:
      state.dataCustom = action.data;
      return {...state};
    case Action.FETCH_CUSTOMDATA_FAILED:
      return (state.dataCustom = []);
    default:
      return state;
  }
};
