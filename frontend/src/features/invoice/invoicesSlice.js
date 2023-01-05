import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import invoicesService from './invoicesService';

const initialState = {
  invoices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};



// Get a single invoice
export const getInvoice = createAsyncThunk(
  'invoices/getInvoice',
  async (invoiceId, thunkAPI) => {
    try {
      return await invoicesService.getInvoice(invoiceId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add an invoice
export const addInvoice = createAsyncThunk(
  'invoices/addInvoice',
  async (invoiceData, thunkAPI) => {
    try {
      return await invoicesService.addInvoice(invoiceData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update invoice
export const updateInvoice = createAsyncThunk(
  'invoices/updateInvoice',
  async (invoiceData, thunkAPI) => {
    try {
      return await invoicesService.updateInvoice(invoiceData, invoiceData.id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete invoice
export const deleteInvoice = createAsyncThunk(
  'invoices/deleteInvoice',
  async (invoiceId, thunkAPI) => {
    try {
      console.log(invoiceId);
      return await invoicesService.deleteInvoice(invoiceId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

