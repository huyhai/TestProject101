import * as reducer from './generalReducer'

const resetToDefaultState = () => ({
    listTransactions: [],
    fetchingData: false
});

const defaultState = resetToDefaultState();

describe('generalReducer', () => {
  describe('fetchFakeData', () => {
    beforeEach(() => {
      resetToDefaultState()
    });

    it('returns expected state for fetchFakeData', () => {
      const expected = {
        ...defaultState,
          fetchingData: true
      };
      const state = reducer.fetchFakeData(defaultState);
      expect(state).toEqual(expected)
    });

    it('returns expected state for fetchFakeDataSuccess', () => {
      const action = {
        payload: ['test', 'array']
      };
      const expected = {
        ...defaultState,
          listTransactions: action.payload
      };
      const state = reducer.fetchFakeDataSuccess(defaultState, action);
      expect(state).toEqual(expected)
    });

    it('returns expected state for fetchFakeDataFailure', () => {
      const expected = {
        ...defaultState,
          fetchingData: false
      };
      const state = reducer.fetchFakeDataFailure(defaultState);
      expect(state).toEqual(expected)
    })
  });
});
