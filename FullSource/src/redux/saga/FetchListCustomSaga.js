import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {
  FETCH_LIST_CUSTOM,
  FETCH_LIST_CUSTOM_SUCCESS,
  FETCH_LIST_CUSTOM_FAILED,
} from '../actions/actionType';                                             

function* getListCustom() {
  const results = yield call(ExecuteSQL, 'SELECT * FROM  Customer where stateCustomer = ?', [1]);
  // console.log("RESULTS FETCH CUSTOM SAGA : ", results);
  var len = results.rows.length;
  const data = [];

  for (let i = 0; i < len; i++) {
    let row = results.rows.item(i);
    data.push(row);
  }

  if (data?.length > 0) {
    // console.log("dataFetchSaga", data);
    yield put({type: FETCH_LIST_CUSTOM_SUCCESS, data});
  } else {
    yield put({type: FETCH_LIST_CUSTOM_FAILED, data});
  }
}

export function* watchFetchListCustom() {
  console.log('SAGA_FETCH_LIST_CUSTOM');
  yield takeLatest(FETCH_LIST_CUSTOM, getListCustom);
}
