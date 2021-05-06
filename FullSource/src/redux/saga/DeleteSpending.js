import {takeLatest, put, call} from 'redux-saga/effects';
import * as Action from '../actions/actionType';
import {ExecuteSQL} from '../saga/OpenDataBase';

function* handleDeleteSpending(action) {
  console.log(`handle deleteSpending`);
  const results = yield call(
    ExecuteSQL,
    'DELETE FROM  spending where id_S=?',
    [],
  );
  var len = results.rows.length;
  const data = [];

  for (let i = 0; i < len; i++) {
    let row = results.rows.item(i);
    data.push(row);
  }

  if (data?.length > 0) {
    console.log('dataFetchSagaEARNING', data);
    yield put({type: Action.FETCH_EARNING_SUCCESS, data});
  } else {
    yield put({type: Action.FETCH_EARNING_FAILED, data});
  }
}

export function* watchDeleteSpending() {
  console.log('SAGA_WATCH_FETCH_Spending');
  yield takeLatest(Action.FETCH_EARNING, handleDeleteSpending);
}
