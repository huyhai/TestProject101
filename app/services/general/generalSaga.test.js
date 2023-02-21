import sagaHelper from 'redux-saga-testing';
import {put, call, takeEvery} from 'redux-saga/effects';
import generalSaga from './generalSaga';
import * as generalActions from './generalActions';

const successResponse = {
  status: 200,
  data: ['test', 'items'],
};

describe('generalSaga', () => {
  const generalAPI = {
    getFakeData: jest.fn(() => {}),
  };
  const saga = generalSaga(generalAPI);

  describe('generalSaga watcher tests', () => {
    const it = sagaHelper(saga.watcher());
    it('Should trigger events handlers', result => {
      expect(result).toEqual(
        takeEvery([generalActions.FETCH_ACCESS_TOKEN], saga.worker),
      );
    });
  });

  describe('generalSaga worker tests', () => {
    describe('generalActions.FETCH_ACCESS_TOKEN', () => {
      const action = {
        type: generalActions.FETCH_ACCESS_TOKEN,
      };
      describe('success response', () => {
        const it = sagaHelper(saga.worker(action));
        it('calls fetchFakeData', result => {
          expect(result).toEqual(call(generalAPI.fetchAccessToken));
          return successResponse;
        });

        it('dispatches the fetchAccessTokenSuccess action', result => {
          expect(result).toEqual(
            put(generalActions.fetchAccessTokenSuccess(successResponse.items)),
          );
        });
      });

      describe('error response', () => {
        const it = sagaHelper(saga.worker(action));

        it('calls fetchAccessToken and return an error', result => {
          expect(result).toEqual(call(generalAPI.fetchAccessToken));
          return null;
        });
        it('dispatches the fetchAccessTokenFailed action', result => {
          expect(result).toEqual(put(generalActions.fetchAccessTokenFailed()));
        });
      });
    });
  });
});
