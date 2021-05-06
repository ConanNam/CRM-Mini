import {combineReducers} from 'redux';

import HomeReducer from './HomeReducer';
import {FEarning, FSpending, FetchSEdata} from './OverViewReducer';
import eaReducer from './eaReducer';
import ListCustomReducer from './ListCustomReducer';
import ListProductReducer from './ListProductReducer';

const allReducer = combineReducers({
  HomeReducer,
  FEarning,
  FSpending,
  FetchSEdata,
  eaReducer,
  listCustomReducer: ListCustomReducer,
  listProductReducer: ListProductReducer,
});

export default allReducer;
