import {createReducer} from 'reduxsauce';
import * as actions from './generalActions';

export const INITIAL_STATE = {
  access_token: null,
  org_token: null,
  fetchingData: false,
  listInvoices: [],
  inputData: {},
  invoicesParams: {
    page: 1,
    pageSize: 20,
    sort: 'DESCENDING',
    filter: 'CREATED_DATE',
    keyword: '',
    canLoadMore: true,
  },
  errorMessage: '',
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
  listInvoices: state.listInvoices.concat(action.payload),
  invoicesParams: {
    ...state.invoicesParams,
    //increase page after successful load data
    page: state.invoicesParams.page + 1,
    //if result less than 20 (page size) items, disable paging
    canLoadMore: action.payload?.length === 20,
  },
});
export const createInvoiceFail = (state, action) => ({
  ...state,
  errorMessage: action.payload,
});
export const setInputSuccess = (state, action) => ({
  ...state,
  inputData: {...state.inputData, ...action.payload},
});
export const setListFilter = (state, action) => ({
  ...state,
  listInvoices: [],
  invoicesParams: {
    ...state.invoicesParams,
    page: 1,
    canLoadMore: true,
    ...action.payload,
  },
  errorMessage: '',
});
export const ACTION_HANDLERS = {
  [actions.FETCH_ACCESS_TOKEN]: fetchAccessToken,
  [actions.FETCH_ACCESS_TOKEN_SUCCESS]: fetchAccessTokenSuccess,
  [actions.FETCH_ACCESS_TOKEN_FAILED]: fetchAccessTokenFailure,
  [actions.FETCH_USER_PROFILE_SUCCESS]: fetchUserProfileSuccess,
  [actions.FETCH_INVOICE_LIST_SUCCESS]: fetchInvoiceSuccess,
  [actions.CREATE_INVOICES_FAILED]: createInvoiceFail,
  [actions.SET_INPUT_DATA]: setInputSuccess,
  [actions.SET_LIST_FILTER]: setListFilter,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
