import * as Actions from './generalActions';

describe('EventActions', () => {
  describe('fetchAccessToken', () => {
    it('returns the expected object for fetchAccessToken', () => {
      expect(Actions.fetchAccessToken()).toEqual({
        type: 'FETCH_ACCESS_TOKEN',
      });
    });

    it('returns the expected object for fetchAccessTokenSuccess', () => {
      expect(Actions.fetchAccessTokenSuccess(['test', 'array'])).toEqual({
        type: 'FETCH_ACCESS_TOKEN_SUCCESS',
        payload: ['test', 'array'],
      });
    });

    it('returns the expected object for fetchAccessTokenFailed', () => {
      expect(Actions.fetchAccessTokenFailed()).toEqual({
        type: 'FETCH_ACCESS_TOKEN_FAILED',
      });
    });
  });
});
