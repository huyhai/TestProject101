import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'
import createReducer from './reducers'

const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(
  createReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// const store = createStore(createReducer, applyMiddleware(sagaMiddleware))

// then run the saga
sagaMiddleware.run(sagas);

export default store
