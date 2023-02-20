import axios from '../../config/axios';
import qs from 'qs';

const create = () => ({
  getAccessToken: async params => axios.post('/token', qs.stringify(params)),
  getUserProfile: async () => axios.get('/membership-service/1.2.0/users/me'),
  getInvoicesList: async () =>
    axios.get(
      '/invoice-service/1.0.0/invoices?pageNum=1&pageSize=10&dateType=INVOICE_DATE&sortBy=CREATED_DATE&ordering=DESCENDING',
    ),
  createInvoices: async params =>
    axios.post('/invoice-service/2.0.0/invoices', params, {
      headers: {
        'Content-Type': 'application/json',
        'Operation-Mode': 'SYNC',
      },
    }),
});

export default create;
