import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {
  ADD_CUSTOM,
  ADD_CUSTOM_FAILED,
  ADD_CUSTOM_SUCCESS,
} from '../actions/actionType';
import {
  FETCH_LIST_CUSTOM,
  FETCH_LIST_CUSTOM_SUCCESS,
  FETCH_LIST_CUSTOM_FAILED,
} from '../actions/actionType';

function* HandleAddCustom(action) {
  console.log(`actionUpdateCustom:  `, action);
  const dataUpdate = action.newCustom;
  console.log('dataUpdate : ', dataUpdate);
  const results = yield call(
    ExecuteSQL,
    'INSERT INTO Customer VALUES (? , ?, ?, ?, ?, ?,?)',
    [
      null,
      dataUpdate.name,
      dataUpdate.phone,
      dataUpdate.address,
      dataUpdate.image,
      dataUpdate.note,
      dataUpdate.stateCustomer
    ],
  );
  const results1 = yield call(ExecuteSQL, 'SELECT * FROM  Customer where stateCustomer = ?;', [1]);
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

export function* watchAddCustom() {
  console.log('SAGA_WATCH_ADD_CUSTOM');
  yield takeLatest(ADD_CUSTOM, HandleAddCustom);
}
