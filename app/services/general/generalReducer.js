import {createReducer} from 'reduxsauce';
import * as actions from './generalActions';

export const INITIAL_STATE = {
  access_token: null,
  org_token: null,
  fetchingData: false,
  listInvoices: [],
  inputData: {},
};

export const fetchAccessToken = state => ({
  ...state,
  fetchingData: true,
});

export const fetchAccessTokenSuccess = (state, action) => ({
  ...state,
  access_token: action.payload,
  fetchingData: false,
});

export const fetchAccessTokenFailure = state => ({
  ...state,
  fetchingData: false,
});
export const fetchUserProfileSuccess = (state, action) => ({
  ...state,
  org_token: action.payload,
});
export const fetchInvoiceSuccess = (state, action) => ({
  ...state,
  listInvoices: action.payload,
});
export const setInputSuccess = (state, action) => ({
  ...state,
  inputData: {...state.inputData, ...action.payload},
});
export const ACTION_HANDLERS = {
  [actions.FETCH_ACCESS_TOKEN]: fetchAccessToken,
  [actions.FETCH_ACCESS_TOKEN_SUCCESS]: fetchAccessTokenSuccess,
  [actions.FETCH_ACCESS_TOKEN_FAILED]: fetchAccessTokenFailure,
  [actions.FETCH_USER_PROFILE_SUCCESS]: fetchUserProfileSuccess,
  [actions.FETCH_INVOICE_LIST_SUCCESS]: fetchInvoiceSuccess,
  [actions.SET_INPUT_DATA]: setInputSuccess,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
