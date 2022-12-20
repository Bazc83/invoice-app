import axios from 'axios';

const API_URL = '/api/invoices';

const getInvoices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const invoicesService = {
  getInvoices,
};

export default invoicesService;
