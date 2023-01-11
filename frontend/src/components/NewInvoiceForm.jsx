import { useAddNewInvoice } from '@/hooks/reactQueryHooks/useAddNewInvoice';
import { useUpdateInvoiceId } from '@/hooks/reactQueryHooks/useUpdateInvoiceId';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { InvoiceForm } from './InvoiceForm';

export const NewInvoiceForm = ({ setShowInvoiceForm }) => {
  const useInvoiceId = () =>
    useQuery({
      queryKey: ['invoiceId'],
      queryFn: async () => {
        const response = await axios.get('/api/invoiceId');
        return response.data[0].invoiceId;
      },
    });

  const { data: invoiceId, isLoading, isError, error } = useInvoiceId();

  const [invoiceData, setInvoiceData] = useState({
    id: invoiceId,
    senderCity: '',
    senderStreet: '',
    senderPostCode: '',
    senderCountry: '',
    clientEmail: '',
    clientName: '',
    clientCity: '',
    clientStreet: '',
    clientCountry: '',
    clientPostCode: '',
    description: '',
    invoiceDate: '',
    createdAt: '',
    paymentDue: '',
    paymentTerms: '0',
    status: 'draft',
    amountDueTotal: 0,
    items: [],
  });

  // Set Invoice id from saved value in db
  useEffect(() => {
    setInvoiceData((prev) => ({ ...prev, id: invoiceId }));
  }, [isLoading, invoiceId]);

  // add new Invoice
  const { newInvoiceMutation } = useAddNewInvoice(invoiceData);

  // update invoiceId
  const { updateIdMutation } = useUpdateInvoiceId();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    newInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: { ...invoiceData },
    });
    // increase invoice id by one
    updateIdMutation.mutate();

    setShowInvoiceForm((prev) => !prev);
  };

  if (isLoading) return 'Loading....';
  if (isError) return `An error has occurred ${error}`;

  return (
    <InvoiceForm
      invoiceData={invoiceData}
      setInvoiceData={setInvoiceData}
      handleFormSubmit={handleFormSubmit}
      setShowInvoiceForm={setShowInvoiceForm}
    />
  );
};
