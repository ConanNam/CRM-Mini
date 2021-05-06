import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {
  FETCH_LIST_PRODUCT,
  FETCH_LIST_PRODUCT_SUCCESS,
  FETCH_LIST_PRODUCT_FAILED,
  ADD_PRODUCT,
  DELETE_PLACE,
  UPDATE_PRODUCT,
  FETCH_PLACE_SUCCESS,
  FETCH_PLACE_FAILED
} from '../actions/actionType';

// delete product

function* deletePlaceSaga(action) {
  console.log('deleteProduct', action.id);
  const d = action.id;
  const results = yield call(ExecuteSQL, 'DELETE FROM Place WHERE id = ?;', [d]);

    ////////////// fetch place action
    const results3 = yield call(ExecuteSQL, 'SELECT * from Place', []);
    const data = [];
    for (let i = 0; i < results3.rows.length; i++) {
      let rowPlace = results3.rows.item(i);
  
      const result4 = yield call(
        ExecuteSQL,
        'SELECT * FROM Customer WHERE id = ?',
        [results3.rows.item(i).id_Customer],
      );
      let rowCustom = result4.rows.item(0);
  
      const result5 = yield call(
        ExecuteSQL,
        'SELECT * FROM Place_Prodcut JOIN Product on Product.id = Place_Prodcut.id_prouct WHERE id_place = ?',
        [results3.rows.item(i).id],
      );
  
      const dataPlace_Product = [];
      for (let v = 0; v < result5.rows.length; v++) {
        let row = result5.rows.item(v);
  
        dataPlace_Product.push(row);
      }
      let dataPlace1 = {
        custom: rowCustom,
        Place_Product: dataPlace_Product,
        place: rowPlace,
      };
      data.push(dataPlace1);
    }
    if (data?.length > 0) {
      yield put({type: FETCH_PLACE_SUCCESS, data});
    } else {
      yield put({type: FETCH_PLACE_FAILED, data});
    }
}

export function* watchDeletePlace() {
  console.log('SAGA_DELETE_PRODUCT');
  yield takeLatest(DELETE_PLACE, deletePlaceSaga);
}
