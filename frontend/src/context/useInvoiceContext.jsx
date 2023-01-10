import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InvoiceContext = createContext();

export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};

export const InvoiceContextProvider = ({ children }) => {
  const { invoiceId } = useParams();

  const { data, isLoading, isError, error } = useFilterInvoiceById(invoiceId);

  const [invoiceData, setInvoiceData] = useState(data);

  useEffect(() => {
    setInvoiceData({
      id: data?.id,
      senderCity: data?.senderAddress?.city,
      senderStreet: data?.senderAddress?.street,
      senderPostCode: data?.senderAddress?.postCode,
      senderCountry: data?.senderAddress?.country,
      clientEmail: data?.clientEmail,
      clientName: data?.clientName,
      clientCity: data?.clientAddress?.city,
      clientStreet: data?.clientAddress?.street,
      clientCountry: data?.clientAddress?.country,
      clientPostCode: data?.clientAddress?.postCode,
      description: data?.description,
      invoiceDate: data?.createdAt,
      createdAt: data?.createdAt,
      paymentDue: data?.paymentDue,
      paymentTerms: data?.paymentTerms,
      status: data?.status,
      amountDueTotal: +data?.total,
      items: data?.items,
    });
    return () => {};
  }, [data]);

  return (
    <InvoiceContext.Provider
      value={{ invoiceData, setInvoiceData, isLoading, isError, error, invoiceId}}>
      {children}
    </InvoiceContext.Provider>
  );
};
