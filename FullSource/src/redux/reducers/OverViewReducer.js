import * as Action from '../actions/actionType';

const initStateSpending = {
  indexTab: 2,
  dataSpending: [],
};

const initStateEarning = {
  indexTab: 2,
  dataEarning: [],
};

const initSE = {
  indexTab: 3,
  dataSE: [],
};

export const FSpending = (state = initStateSpending, action) => {
  switch (action.type) {
    case Action.FETCH_SPENDING_SUCCESS:
      state.dataSpending = action.data;
      return {...state};
    case Action.FETCH_SPENDING_FAILED:
      return (state.dataSpending = []);
    default:
      return state;
  }
};

export const FEarning = (state = initStateEarning, action) => {
  switch (action.type) {
    case Action.FETCH_EARNING_SUCCESS:
      state.dataEarning = action.data;
      return {...state};
    case Action.FETCH_EARNING_FAILED:
      return (state.dataEarning = []);
    default:
      return state;
  }
};

export const FetchSEdata = (state = initSE, action) => {
  switch (action.type) {
    case Action.FETCH_ALL_SE_SUCCESS:
      state.dataSE = action.data;
      return {...state};
    case Action.FETCH_ALL_SE_FAILED:
      return (state.dataSE = []);
    default:
      return state;
  }
};
