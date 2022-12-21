import axios from 'axios';
import { useState } from 'react';

export const useInvoiceId = () => {
  const [invoiceId, setInvoiceId] = useState();

  const API_URL = '/api/invoiceId';

  const getInvoiceId = async () => {
    const response = await axios.get(API_URL);
    return setInvoiceId(await response.data);
   
  };

  const updateInvoiceId = async () => {
    const response = await axios.post(API_URL);

    return setInvoiceId(response.data);
  
  };

  
  return { getInvoiceId, updateInvoiceId, invoiceId };
};
