import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const InvoicesContext = createContext();

function InvoicesData({ children }) {
  const [invoices, setInvoices] = useState([]);

  const options = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];

  const getData = async () => {
    const response = await axios.get('http://localhost:5000/api/invoices');
    setInvoices([...response.data]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <InvoicesContext.Provider value={{ invoices, setInvoices, options }}>
      {invoices && children}
    </InvoicesContext.Provider>
  );
}
export default InvoicesData;
