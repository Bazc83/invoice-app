import axios from 'axios';

const API_URL = '/api/invoices/';

const getInvoices = async () => {

  const response = await axios.get(API_URL);
  return response.data;
};
const getInvoice = async (invoiceId) => {
  const response = await axios.get(API_URL + invoiceId);
  return response.data;
};
const addInvoice = async (invoiceData) => {

  const response = await axios.post(API_URL, invoiceData);
  return response.data;
};

const updateInvoice = async ( invoiceData, invoiceId) => {
  const response = await axios.post(API_URL + invoiceId, invoiceData);
  return response.data;
};

const invoicesService = {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
};

export default invoicesService;
