export const FETCH_ACCESS_TOKEN = 'FETCH_ACCESS_TOKEN';
export const FETCH_ACCESS_TOKEN_SUCCESS = 'FETCH_ACCESS_TOKEN_SUCCESS';
export const FETCH_ACCESS_TOKEN_FAILED = 'FETCH_ACCESS_TOKEN_FAILED';

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILED = 'FETCH_USER_PROFILE_FAILED';

export const FETCH_INVOICE_LIST = 'FETCH_INVOICE_LIST';
export const FETCH_INVOICE_LIST_SUCCESS = 'FETCH_INVOICE_LIST_SUCCESS';
export const FETCH_INVOICE_LIST_FAILED = 'FETCH_INVOICE_LIST_FAILED';

export const CREATE_INVOICES = 'CREATE_INVOICES';
export const CREATE_INVOICES_SUCCESS = 'CREATE_INVOICES_SUCCESS';
export const CREATE_INVOICES_FAILED = 'CREATE_INVOICES_FAILED';

export const SET_INPUT_DATA = 'SET_INPUT_DATA';
export const setInputData = payload => ({
  type: SET_INPUT_DATA,
  payload,
});

export const createInvoices = () => ({
  type: CREATE_INVOICES,
});

export const createInvoicesSuccess = payload => ({
  type: CREATE_INVOICES_SUCCESS,
  payload,
});

export const createInvoicesFailed = () => ({
  type: CREATE_INVOICES_FAILED,
});

export const fetchInvoiceList = () => ({
  type: FETCH_INVOICE_LIST,
});

export const fetchInvoiceListSuccess = payload => ({
  type: FETCH_INVOICE_LIST_SUCCESS,
  payload,
});

export const fetchInvoiceListFailed = () => ({
  type: FETCH_INVOICE_LIST_FAILED,
});

export const fetchAccessToken = () => ({
  type: FETCH_ACCESS_TOKEN,
});

export const fetchAccessTokenSuccess = payload => ({
  type: FETCH_ACCESS_TOKEN_SUCCESS,
  payload,
});

export const fetchAccessTokenFailed = () => ({
  type: FETCH_ACCESS_TOKEN_FAILED,
});

export const fetchUserProfile = () => ({
  type: FETCH_USER_PROFILE,
});

export const fetchUserProfileSuccess = payload => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload,
});

export const fetchUserProfileFailed = () => ({
  type: FETCH_USER_PROFILE_FAILED,
});
