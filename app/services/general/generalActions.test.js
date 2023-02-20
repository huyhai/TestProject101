import * as Actions from './generalActions'

describe('EventActions', () => {
  describe('Menus Top', () => {
    it('returns the expected object for fetchFakeData', () => {
      expect(Actions.fetchFakeData()).toEqual({
        type: 'FETCH_FAKE_DATA'
      })
    });

    it('returns the expected object for fetchFakeDataSuccess', () => {
      expect(Actions.fetchFakeDataSuccess(['test', 'array'])).toEqual({
        type: 'FETCH_FAKE_DATA_SUCCESS',
        payload: ['test', 'array']
      })
    });

    it('returns the expected object for fetchFakeDataFailed', () => {
      expect(Actions.fetchFakeDataFailed()).toEqual({
        type: 'FETCH_FAKE_DATA_FAILED'
      })
    })
  });
});
