import React, { useEffect } from "react";
import { View } from "react-native";
import { takeLatest, put, call } from "redux-saga/effects";
import {ExecuteSQL} from './OpenDataBase'
import {
  FETCH_PLACE,
  FETCH_PLACE_FAILED,
  FETCH_PLACE_SUCCESS,
} from "../actions/actionType";


function* HandleFetchPlace(action) {
  console.log(`1`, 1)
  const results = yield call(ExecuteSQL, "SELECT * from Place  " ,[]);
  console.log("1", results)
  const data = [];
  for(let i =0; i< results.rows.length; i++){
    console.log("2", results.rows.item(i));
    let rowPlace = results.rows.item(i);
    const result1 =  yield call(ExecuteSQL, "SELECT * FROM Customer WHERE id = ?", [results.rows.item(i).id_Customer]);
    let rowCustom = result1.rows.item(0);
    console.log("3",result1.rows.item(0))
    const result2 = yield call(ExecuteSQL, "SELECT * FROM Place_Prodcut JOIN Product on Product.id = Place_Prodcut.id_prouct WHERE id_place = ?", [results.rows.item(i).id] )
    const dataPlace_Product =[];
    console.log("22", result2.rows.item(0))
    for(let v=0; v < result2.rows.length; v++){
      let row = result2.rows.item(v);
      dataPlace_Product.push(row);
    }
    console.log("11221",rowCustom);
    console.log("1122",dataPlace_Product);
    console.log("1122",rowPlace);
    let dataPlace = {custom : rowCustom, Place_Product : dataPlace_Product, place : rowPlace}
    data.push(dataPlace);
  }
  
 console.log("data", data);
  if (data?.length > 0) {
    console.log("dataFetchSaga", data);
    yield put({ type: FETCH_PLACE_SUCCESS, data });
  }
  else {
    yield put({ type: FETCH_PLACE_FAILED, data });
  }
}

export function* watchFetchPlace() {
  console.log("SAGA_WATCH_FETCH_PLACE");
  yield takeLatest(FETCH_PLACE, HandleFetchPlace);
  
}
