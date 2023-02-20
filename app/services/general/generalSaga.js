import {takeEvery, call, put, select} from 'redux-saga/effects';
import * as actions from './generalActions';
import {setAuthHeader, setOrgToken} from '../../config/axios';

export default api => {
  function* worker(action) {
    switch (action.type) {
      case actions.FETCH_ACCESS_TOKEN: {
        const params = {
          client_id: 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
          client_secret: '0Exp4dwqmpON_ezyhfm0o_Xkowka',
          grant_type: 'password',
          scope: 'openid',
          username: 'dung+octopus4@101digital.io',
          password: 'Abc@123456',
        };
        const response = yield call(api.getAccessToken, params);
        if (response) {
          yield put(actions.fetchAccessTokenSuccess(response.access_token));
          yield call(setAuthHeader, response.access_token);
          yield put(actions.fetchUserProfile());
        } else {
          yield put(actions.fetchAccessTokenFailed());
        }
        break;
      }
      case actions.FETCH_USER_PROFILE: {
        const response = yield call(api.getUserProfile);
        if (response) {
          let token;
          const memberships = response?.data?.memberships;
          if (memberships && memberships.length > 0) {
            token = memberships[0].token;
          }
          yield put(actions.fetchUserProfileSuccess(token));
          yield call(setOrgToken, token);
          yield put(actions.fetchInvoiceList());
        } else {
          yield put(actions.fetchUserProfileFailed());
        }
        break;
      }
      case actions.FETCH_INVOICE_LIST: {
        const response = yield call(api.getInvoicesList);
        if (response) {
          yield put(actions.fetchInvoiceListSuccess(response?.data));
        } else {
          yield put(actions.fetchInvoiceListFailed());
        }
        break;
      }
      case actions.CREATE_INVOICES: {
        const {inputData} = yield select(state => state.general);
        console.log(inputData);
        const params = {
          invoices: [
            {
              bankAccount: {
                bankId: '',
                sortCode: '09-01-01',
                accountNumber: '12345678',
                accountName: 'John Terry',
              },
              customer: {
                firstName: 'Nguyen',
                lastName: 'Dung 2',
                contact: {
                  email: 'nguyendung2@101digital.io',
                  mobileNumber: '+6597594971',
                },
                addresses: [
                  {
                    premise: 'CT11',
                    countryCode: 'VN',
                    postcode: '1000',
                    county: 'hoangmai',
                    city: 'hanoi',
                  },
                ],
              },
              documents: [
                {
                  documentId: '96ea7d60-89ed-4c3b-811c-d2c61f5feab2',
                  documentName: 'Bill',
                  documentUrl: 'http://url.com/#123',
                },
              ],
              invoiceReference: inputData?.reference || '',
              invoiceNumber: inputData?.reference || '',
              currency: 'GBP',
              invoiceDate: inputData?.date || '2021-05-27',
              dueDate: '2021-06-04',
              description: inputData?.description || '',
              customFields: [
                {
                  key: 'invoiceCustomField',
                  value: 'value',
                },
              ],
              extensions: [
                {
                  addDeduct: 'ADD',
                  value: 10,
                  type: 'PERCENTAGE',
                  name: 'tax',
                },
                {
                  addDeduct: 'DEDUCT',
                  type: 'FIXED_VALUE',
                  value: 10.0,
                  name: 'discount',
                },
              ],
              items: [
                {
                  itemReference: 'itemRef',
                  description: 'Honda RC150',
                  quantity: inputData?.amount || '',
                  rate: 1000,
                  itemName: 'Honda Motor',
                  itemUOM: 'KG',
                  customFields: [
                    {
                      key: 'taxiationAndDiscounts_Name',
                      value: 'VAT',
                    },
                  ],
                  extensions: [
                    {
                      addDeduct: 'ADD',
                      value: 10,
                      type: 'FIXED_VALUE',
                      name: 'tax',
                    },
                    {
                      addDeduct: 'DEDUCT',
                      value: 10,
                      type: 'PERCENTAGE',
                      name: 'tax',
                    },
                  ],
                },
              ],
            },
          ],
        };
        const response = yield call(api.createInvoices, JSON.stringify(params));
        if (response) {
          yield put(actions.fetchInvoiceList());
        } else {
          yield put(actions.createInvoicesFailed());
        }
        break;
      }
    }
  }

  function* watcher() {
    yield takeEvery(
      [
        actions.FETCH_ACCESS_TOKEN,
        actions.FETCH_USER_PROFILE,
        actions.FETCH_INVOICE_LIST,
        actions.CREATE_INVOICES,
      ],
      worker,
    );
  }

  return {worker, watcher};
};
