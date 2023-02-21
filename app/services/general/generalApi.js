import axios from '../../config/axios';
import qs from 'qs';

const create = () => ({
  getAccessToken: async params => axios.post('/token', qs.stringify(params)),
  getUserProfile: async () => axios.get('/membership-service/1.2.0/users/me'),
  getInvoicesList: async (pageNum, pageSize, sort, filter, keyword) =>
    axios.get(
      '/invoice-service/1.0.0/invoices?pageNum=' +
        pageNum +
        '&pageSize=' +
        pageSize +
        '&dateType=INVOICE_DATE&sortBy=' +
        filter +
        '&ordering=' +
        sort +
        '&keyword=' +
        keyword,
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
