import {takeLatest, put, call} from 'redux-saga/effects';
import * as Action from '../actions/actionType';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {Alert} from 'react-native';
/////// deleteSpending
function* handleDeleteSpending(action) {
  console.log(`handle deleteSpending`);
  const results = yield call(
    ExecuteSQL,
    'DELETE FROM  spending where id_S=?',
    [],
  );

  if (results.rowsAffected > 0) {
    console.log('deleteSpenidng');
    yield put({type: Action.DELETE_SPENDING_SUCCESS, data});
  } else {
    yield put({type: Action.FETCH_EARNING_FAILED, data});
  }
}

export function* watchDeleteSpending() {
  console.log('SAGA_WATCH_FETCH_Spending');
  yield takeLatest(Action.FETCH_EARNING, handleDeleteSpending);
}

/// delete earning

function* handleDeleteEarning(action) {
  console.log(`handle deleteEarning`);
  const results = yield call(
    ExecuteSQL,
    'DELETE FROM  earning where id_E=?',
    [],
  );
}

export function* watchDeleteEarning() {
  console.log('SAGA_WATCH_FETCH_Spending');
  yield takeLatest(Action.FETCH_EARNING, handleDeleteEarning);
}

/////////// fetch earning
function* handleFetchEarning(action) {
  console.log(`handle Fetch Earning`);
  const resultsE = yield call(
    ExecuteSQL,
    'SELECT * FROM earning ORDER BY time_E DESC',
    [],
  );
  var lenE = resultsE.rows.length;
  const dataE = [];

  for (let i = 0; i < lenE; i++) {
    let rowE = resultsE.rows.item(i);
    dataE.push(rowE);
  }

  if (dataE?.length > 0) {
    yield put({type: Action.FETCH_EARNING_SUCCESS, dataE});
  } else {
    yield put({type: Action.FETCH_EARNING_FAILED, dataE});
  }
}

export function* watchFetchEarning() {
  console.log('SAGA_WATCH_FETCH_Spending');
  yield takeLatest(Action.FETCH_EARNING, handleFetchEarning);
}

////// fetch spending

function* handleFetchSpending(action) {
  console.log(`handle Fetch spending`);
  const resultsS = yield call(
    ExecuteSQL,
    'SELECT * FROM spending ORDER BY time_S DESC',
    [],
  );
  var lenS = resultsS.rows.length;
  const dataS = [];

  for (let i = 0; i < lenS; i++) {
    let rowS = resultsS.rows.item(i);
    dataS.push(rowS);
  }

  if (dataS?.length > 0) {
    yield put({type: Action.FETCH_SPENDING_SUCCESS, dataS});
  } else {
    yield put({type: Action.FETCH_SPENDING_FAILED, dataS});
  }
}

export function* watchFetchSpending() {
  console.log('SAGA_WATCH_FETCH_Spending');
  yield takeLatest(Action.FETCH_SPENDING, handleFetchSpending);
}

function* handleFetchSE(action) {
  const results = yield call(ExecuteSQL, 'SELECT * FROM  spending', []);
  var lenS = results.rows.length;
  console.log('lenS: ' + lenS);
  const dataS = [];

  for (let i = 0; i < lenS; i++) {
    let row = results.rows.item(i);
    dataS.push(row);
  }

  const resultsE = yield call(ExecuteSQL, 'SELECT * FROM  earning', []);
  var lenE = resultsE.rows.length;
  console.log('lenE: ' + lenE);
  const dataE = [];
  for (let i = 0; i < lenE; i++) {
    let rowE = resultsE.rows.item(i);
    dataE.push(rowE);
  }
  if (dataE?.length > 0) {
    yield put({type: Action.FETCH_ALL_SE_SUCCESS, data: [dataS, dataE]});
  }
}

export function* watchFetchSE() {
  yield takeLatest(Action.FETCH_ALL_SE, handleFetchSE);
  console.log('watchFetch_ALL_SE');
}

/////////// insert ////////////////////////////////////

function* handleInsertSpending(action) {
  const {data} = action;
  console.log(`action: ` + action);
  const results = yield call(
    ExecuteSQL,
    'INSERT INTO spending (id, name_S, note_S, time_S, cost_S, img_S, status) VALUES (?,?,?,?,?,?,?)',
    [
      null,
      data.name_S,
      data.note_S,
      data.time_S,
      data.cost_S,
      data.img_S,
      null,
    ],
  );

  if (results.rowsAffected > 0) {
    const resultsS = yield call(ExecuteSQL, 'SELECT * FROM  spending', []);
    var lenS = resultsS.rows.length;
    const dataS = [];

    for (let i = 0; i < lenS; i++) {
      let rowS = resultsS.rows.item(i);
      data.push(rowS);
    }
    console.log(dataS.length);

    if (dataS?.length > 0) {
      console.log('dataFetchSaga', dataS);
      yield put({type: Action.FETCH_SPENDING_SUCCESS, dataS});
      Alert.alert('Thêm thành công', '', [{text: 'OK'}]);
    } else {
      yield put({type: Action.FETCH_SPENDING_FAILED, dataS});
    }
  }
}

export function* watchInsertSpending() {
  console.log('watchInsertSpendinglll');
  yield takeLatest(Action.INSERT_SPENDING, handleInsertSpending);
}

export function* handleFetchCustomData(action) {
  const data = action.data;
  yield put({type: Action.FETCH_CUSTOMDATA_SUCCESS, data});
}

export function* watchFetchCustomData() {
  yield takeLatest(Action.FETCH_CUSTOMDATA, handleFetchCustomData);
}
