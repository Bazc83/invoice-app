import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from '../features/invoice/invoicesSlice';

export default configureStore({
  reducer: {
    invoices: invoicesSlice,
  },
});
