import { useEffect, useState } from 'react';
import { useFilterInvoiceById } from './useFilterInvoiceById';

const useSetInvoiceData = (data) => {
  const [invoiceData, setInvoiceData] = useState(data);

  const [amountDue, setAmountDue] = useState(data?.total);

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
      items: data?.items,
    });
    return () => {};
  }, [amountDue, data]);

  return {
    invoiceData,
    setInvoiceData,
    setAmountDue,
    amountDue,
  };
};

export default useSetInvoiceData;
