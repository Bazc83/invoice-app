import data from '@data/data.json';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export const Invoice = () => {
  const { invoiceId } = useParams();
  const [invoiceState, setInvoiceState] = useState();

  useEffect(() => {
    setInvoiceState(data.filter((invoice) => invoice.id === invoiceId)[0]);
  }, [invoiceId]);
console.log(invoiceState)
  return <div>{invoiceState?.clientName}</div>;
};
