import { useEffect, useState } from 'react';

const useSetInvoiceData = (data) => {
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
      amountDueTotal: data?.total,
      items: data?.items,
    });
    return () => {};
  }, [data]);

  return {
    invoiceData,
    setInvoiceData,
  };
};

export default useSetInvoiceData;
