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

// update product
function* updateProductSaga(action) {
  const dataUpdate = action.obj;
  console.log('dataUpdate : ', dataUpdate);
  const results = yield call(
    ExecuteSQL,
    'UPDATE Product set nameProduct=?,valueProduct =?,  imageProduct=?,noteProdcut=? WHERE id=?;',
    [
      dataUpdate.nameProduct,
      dataUpdate.valueProduct,
      dataUpdate.imageProduct,
      dataUpdate.noteProduct,
      dataUpdate.id,
    ],
  );

  const results1 = yield call(ExecuteSQL, 'SELECT * FROM  Product;', []);
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

export function* watchUpdateProduct() {
  console.log('SAGA_UPDATE_PRODUCT');
  yield takeLatest(UPDATE_PRODUCT, updateProductSaga);
}
