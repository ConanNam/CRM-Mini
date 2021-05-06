import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from './OpenDataBase';
import {ADD_PLACE} from '../actions/actionType';

import {
  FETCH_PLACE_FAILED,
  FETCH_PLACE_SUCCESS,
} from '../actions/actionType';

function* HandleAddPlace(action) {
  const dataPlace = action.newPlace;
  console.log('dataPlace : ', dataPlace.itemCustom.id);
  const results = yield call(
    ExecuteSQL,
    'INSERT INTO Place VALUES (? , ?, ?, ?, ?)',
    [
      null,
      dataPlace.itemCustom.id,
      dataPlace.notePlace,
      dataPlace.statePlace,
      dataPlace.timePlace,
    ],
  );
  console.log('results: ', results.rowsAffected);
  const results1 = yield call(ExecuteSQL, 'SELECT * FROM Place ', []);
  console.log('add place product1', results.rowsAffected);
  console.log('results1', results1);
  let len = results1.rows.length;
  const id_place = yield results1.rows.item(len - 1).id;
  console.log('dataPlace_', id_place);
  let a = dataPlace.dataListProduct.length;
  console.log('a', a);
  for (let v = 0; v < a; v++) {
    const results2 = yield call(
      ExecuteSQL,
      'INSERT INTO Place_Prodcut VALUES (? , ?, ?, ?, ?)',
      [
        null,
        dataPlace.dataListProduct[v].id,
        id_place,
        dataPlace.dataListProduct[v].quantity,
        dataPlace.dataListProduct[v].discount,
      ],
    );
    console.log('add place product2', results2.rowsAffected);
  }

  ////////////// fetch place action
  const results3 = yield call(ExecuteSQL, 'SELECT * from Place', []);
 
  const data = [];
  for (let i = 0; i < results3.rows.length; i++) {
    let rowPlace = results3.rows.item(i);
    console.log(`result3 add Place saga : `, results3.rows.item(i));
    const result4 = yield call(
      ExecuteSQL,
      'SELECT * FROM Customer WHERE id = ?',
      [results3.rows.item(i).id_Customer],
    );
    // console.log(`result4 add Place saga : `, result4.rows.item(i).name);
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

export function* watchAddPlace() {
  console.log('SAGA_WATCH_ADD_PLACE');
  yield takeLatest(ADD_PLACE, HandleAddPlace);
}
