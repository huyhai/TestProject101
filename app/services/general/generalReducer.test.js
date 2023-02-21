import * as reducer from './generalReducer';

const resetToDefaultState = () => ({
  listInvoices: [],
  fetchingData: false,
});

const defaultState = resetToDefaultState();

describe('generalReducer', () => {
  describe('fetchAccessToken', () => {
    beforeEach(() => {
      resetToDefaultState();
    });

    it('returns expected state for fetchAccessToken', () => {
      const expected = {
        ...defaultState,
        fetchingData: true,
      };
      const state = reducer.fetchAccessToken(defaultState);
      expect(state).toEqual(expected);
    });

    // it('returns expected state for fetchAccessTokenSuccess', () => {
    //   const action = {
    //     payload: ['test', 'array'],
    //   };
    //   const expected = {
    //     ...defaultState,
    //     listInvoices: action.payload,
    //   };
    //   const state = reducer.fetchAccessTokenSuccess(defaultState, action);
    //   expect(state).toEqual(expected);
    // });

    it('returns expected state for fetchAccessTokenFailure', () => {
      const expected = {
        ...defaultState,
        fetchingData: false,
      };
      const state = reducer.fetchAccessTokenFailure(defaultState);
      expect(state).toEqual(expected);
    });
  });
});
