import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import invoicesService from './invoicesService';

const initialState = {
  invoices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getInvoices = createAsyncThunk(
  'invoices/getInvoices',
  async (_, thunkAPI) => {
    try {
      return await invoicesService.getInvoices();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getInvoice = createAsyncThunk(
  'invoices/getInvoice',
  async (_, thunkAPI) => {
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




export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.invoices = action.payload;
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.invoices = action.payload;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.invoices.push(action.payload);
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = invoicesSlice.actions;

export default invoicesSlice.reducer;
