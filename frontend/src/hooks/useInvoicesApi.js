import axios from 'axios';

const API_URL = '/api/invoices/';

export const getInvoices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getInvoice = async (invoiceId) => {
  const response = await axios.get(API_URL + invoiceId);
  return response.data;
};

export const getItems = async (invoiceId, itemId) => {
  const response = await axios.get(
    API_URL + `/${invoiceId}/items/${itemId}`,
    itemData
  );
  return response.data;
};

export const addInvoice = async (invoiceData) => {
  const response = await axios.post(API_URL, invoiceData);
  return response.data;
};

export const updateInvoice = async (invoiceId, invoiceData) => {
  const response = await axios.put(API_URL + invoiceId, invoiceData);
  return response.data;
};

export const updateItem = async (invoiceId, itemId, itemData) => {
  const response = await axios.put(
    API_URL + `/${invoiceId}/items/${itemId}`,
    itemData
  );
  return response.data;
};

export const deleteInvoice = async (invoiceId) => {
  console.log(invoiceId);
  const response = await axios.delete(API_URL + invoiceId);
  return response.data;
};
