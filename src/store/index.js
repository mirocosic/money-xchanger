import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import common from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  common,
})

export default createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
