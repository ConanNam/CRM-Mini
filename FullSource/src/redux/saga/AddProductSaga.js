import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {ADD_PRODUCT} from '../actions/actionType';
import {
  FETCH_LIST_PRODUCT,
  FETCH_LIST_PRODUCT_SUCCESS,
  FETCH_LIST_PRODUCT_FAILED,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/actionType';

function* HandleAddProductADD_PRODUCT(action) {
  console.log(`actionUpdateProductADD_PRODUCT:  `, action);
  const dataUpdate = action.obj;
  console.log('dataUpdate : ', dataUpdate);
  const results = yield call(
    ExecuteSQL,
    'INSERT INTO Product VALUES (? , ?, ?, ?, ?, ?)',
    [
      null,
      dataUpdate.nameProduct,
      dataUpdate.imageProduct,
      dataUpdate.valueProduct,
      dataUpdate.noteProduct,
      1
    ],
  );

  const results1 = yield call(ExecuteSQL, 'SELECT * FROM  Product where deleteProduct =?;', [1]);
  // console.log("RESULTS FETCH CUSTOM SAGA : ", results);
  var len = results1.rows.length;
  const data = [];

  for (let i = 0; i < len; i++) {
    let row = results1.rows.item(i);
    data.push(row);
  }

  if (data?.length > 0) {
    console.log("dataFetchSaga", data);
    yield put({type: FETCH_LIST_PRODUCT_SUCCESS, data});
  } else {
    yield put({type: FETCH_LIST_PRODUCT_FAILED, data});
  }
}

export function* watchAddProduct() {
  console.log('SAGA_WATCH_ADD_PRODUCT');
  yield takeLatest(ADD_PRODUCT, HandleAddProductADD_PRODUCT);
}
