import {fork} from 'redux-saga/effects';

import generalAPI from './general/generalApi';
import generalSaga from './general/generalSaga';
export default function* root() {
  yield fork(generalSaga(generalAPI()).watcher);
}
