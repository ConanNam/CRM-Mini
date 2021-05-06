import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {
  FETCH_LIST_PRODUCT,
  FETCH_LIST_PRODUCT_SUCCESS,
  FETCH_LIST_PRODUCT_FAILED,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/actionType';

function* getListProduct() {
  const results = yield call(ExecuteSQL, 'SELECT * FROM  Product where deleteProduct = ?;', [1]);
  // console.log("RESULTS FETCH CUSTOM SAGA : ", results);
  var len = results.rows.length;
  const data = [];

  for (let i = 0; i < len; i++) {
    let row = results.rows.item(i);
    data.push(row);
  }

  if (data?.length > 0) {
    // console.log("dataFetchSaga", data);
    yield put({type: FETCH_LIST_PRODUCT_SUCCESS, data});
  } else {
    yield put({type: FETCH_LIST_PRODUCT_FAILED, data});
  }
}


export function* watchFetchListProduct() {
  console.log('SAGA_FETCH_LIST_PRODUCT');
  yield takeLatest(FETCH_LIST_PRODUCT, getListProduct);
}
