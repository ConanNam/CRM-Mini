import {takeLatest, put, call, takeEvery} from 'redux-saga/effects';
import * as Action from '../actions/actionType';
import {ExecuteSQL} from '../saga/OpenDataBase';

function* handleFetchSpending(action) {
  const results = yield call(
    ExecuteSQL,
    'SELECT * FROM spending ORDER BY time_S DESC',
    [],
  );
  var len = results.rows.length;
  const data = [];

  for (let i = 0; i < len; i++) {
    let row = results.rows.item(i);
    data.push(row);
  }

  if (data?.length > 0) {
    yield put({type: Action.FETCH_SPENDING_SUCCESS, data});
  } else {
    yield put({type: Action.FETCH_SPENDING_FAILED, data});
  }
}

export function* watchFetchSpending() {
  console.log('SAGA_WATCH_FETCH_Spending');
  yield takeEvery(Action.FETCH_SPENDING, handleFetchSpending);
}
