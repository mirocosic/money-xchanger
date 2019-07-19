import { all, select, takeEvery, call, put, delay } from 'redux-saga/effects';
import API from '../api';

export function* getRates(){
  yield takeEvery(["GET_RATES", "SWITCH_ACCOUNTS"], function*(){

    try{
      const currency = yield select(state=>state.common.primaryCurrency)
      const response = yield call( API.getRates, currency )

      if (response.success) {
        yield put({type:"GET_RATES_DONE", rates: response.data.rates})
      } else {
        yield put({type:"GET_RATES_ERROR", errorMessage: "Something went wrong! API error"})
      }

    } catch(e){

      console.log(e)

    }


  })
}

function* pollingService(){
  while(true){
    yield put({type: "GET_RATES"})
    yield delay(10000)
  }
}

export default function* rootSaga() {
  yield all([
    getRates(),
    pollingService()
  ])
}
