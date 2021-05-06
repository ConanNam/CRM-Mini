import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {
  UPDATE_CUSTOM,
  UPDATE_CUSTOM_SUCCESS,
  UPDATE_CUSTOM_FAILED,
} from '../actions/actionType';

import {
  FETCH_LIST_CUSTOM,
  FETCH_LIST_CUSTOM_SUCCESS,
  FETCH_LIST_CUSTOM_FAILED,
} from '../actions/actionType';

function* HandleUpdateCustom(action) {
  console.log(`actionUpdateCustom:  `, action);
  const dataUpdate = action.obj;
  console.log('dataUpdate : ', dataUpdate);
  const results = yield call(
    ExecuteSQL,
    'UPDATE Customer set name=?, phone=?, address=?, image=?, note=? WHERE id=?;',
    [
      dataUpdate.name,
      dataUpdate.phone,
      dataUpdate.address,
      dataUpdate.image,
      dataUpdate.note,
      dataUpdate.id,
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

export function* watchUpdateCustom() {
  console.log('SAGA_WATCH_UPDATE_CUSTOM');
  yield takeLatest(UPDATE_CUSTOM, HandleUpdateCustom);
}
