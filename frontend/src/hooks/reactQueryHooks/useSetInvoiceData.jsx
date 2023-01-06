import { useEffect, useState } from 'react';
import { useFilterInvoiceById } from './useFilterInvoiceById';

const useSetInvoiceData = (invoiceId) => {
  const [invoiceData, setInvoiceData] = useState({});

  const { data, isLoading, isError, error } = useFilterInvoiceById(invoiceId);

  const [amountDue, setAmountDue] = useState(data?.total);
  const [itemsArray, setItemsArray] = useState(data?.items);

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
      amountDueTotal: amountDue,
      items: itemsArray,
    });

    return () => {};
  }, [amountDue, isLoading, itemsArray, amountDue]);

  return {
    isLoading,
    isError,
    error,
    invoiceData,
    setInvoiceData,
    setAmountDue,
    amountDue,
    itemsArray,
    setItemsArray,
  };
};

export default useSetInvoiceData;
