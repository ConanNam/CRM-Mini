import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {
  DELETE_CUSTOM,
  DELETE_CUSTOM_FAILED,
  DELETE_CUSTOM_SUCCESS,
} from '../actions/actionType';

import {
  FETCH_LIST_CUSTOM,
  FETCH_LIST_CUSTOM_SUCCESS,
  FETCH_LIST_CUSTOM_FAILED,
} from '../actions/actionType';

function* HandleDeleteCustom(action) {
  console.log(`actionUpdateCustom:  `, action);
  const dataDelete = action.id;
  console.log('dataUpdate : ', dataDelete);
  const results = yield call(ExecuteSQL, 'UPDATE Customer set stateCustomer = ?  WHERE id = ?', [
    0,dataDelete,
  ]);

  const results1 = yield call(ExecuteSQL, 'SELECT * FROM  Customer where stateCustomer = ? ;', [1]);
  // console.log("RESULTS FETCH CUSTOM SAGA : ", results);
  var len = results1.rows.length;
  const data = [];

  for (let i = 0; i < len; i++) {
    let row = results1.rows.item(i);
    data.push(row);
  }

  if (data?.length > 0) {
    // console.log("dataFetchSaga", data);
    yield put({type: FETCH_LIST_CUSTOM_SUCCESS, data});
  } else {
    yield put({type: FETCH_LIST_CUSTOM_FAILED, data});
  }
}

export function* watchDeleteCustom() {
  console.log('SAGA_WATCH_DELETE_CUSTOM');
  yield takeLatest(DELETE_CUSTOM, HandleDeleteCustom);
}
