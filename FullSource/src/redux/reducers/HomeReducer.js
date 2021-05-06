import {FETCH_PLACE_FAILED, FETCH_PLACE_SUCCESS} from '../actions/actionType';

const initStateListPlace = {
  dataPlace: [],
};
const HomeReducer = (state = initStateListPlace, action) => {
  switch (action.type) {
    case FETCH_PLACE_SUCCESS:
      console.log("actionHomeReducer : ", action.data);
      state.dataPlace = action.data;
      return {...state};
    case FETCH_PLACE_FAILED:
      state.dataPlace = []
      return {...state};
    default:
      return state;
  }
};

export default HomeReducer;
