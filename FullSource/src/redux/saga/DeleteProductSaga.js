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

// delete product

function* deleteProductSaga(action) {
  console.log('deleteProduct', action.id);
  const d = action.id;
  const results = yield call(ExecuteSQL, 'UPDATE Product set deleteProduct =? WHERE id = ?', [
    0,d
  ]);

  const results1 = yield call(ExecuteSQL, 'SELECT * FROM  Product where deleteProduct = ?;', [1]);
  // console.log("RESULTS FETCH CUSTOM SAGA : ", results);
  var len = results1.rows.length;
  const data = [];

  for (let i = 0; i < len; i++) {
    let row = results1.rows.item(i);
    data.push(row);
  }

  if (data?.length > 0) {
    // console.log("dataFetchSaga", data);
    yield put({type: FETCH_LIST_PRODUCT_SUCCESS, data});
  } else {
    yield put({type: FETCH_LIST_PRODUCT_FAILED, data});
  }
}

export function* watchDeleteProduct() {
  console.log('SAGA_DELETE_PRODUCT');
  yield takeLatest(DELETE_PRODUCT, deleteProductSaga);
}
