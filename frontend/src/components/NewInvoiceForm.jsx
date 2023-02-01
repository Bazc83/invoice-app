import { useContext, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { InvoicesContext } from '@/context/InvoicesContext';
import { useAddNewInvoice } from '@/hooks/reactQueryHooks/useAddNewInvoice';
import { useUpdateInvoiceId } from '@/hooks/reactQueryHooks/useUpdateInvoiceId';
import { setInvoiceDates } from '@/hooks/setInvoiceDates';

import { InvoiceForm } from './InvoiceForm';

export function NewInvoiceForm() {
  const { dispatch } = useContext(InvoicesContext);

  const { todaysDate } = setInvoiceDates();

  const [itemsArray, setItemsArray] = useState([]);

  const useInvoiceId = () =>
    useQuery({
      queryKey: ['invoiceId'],
      queryFn: async () => {
        const response = await axios.get('/api/invoiceId');
        return response.data[0].invoiceId;
      },
    });

  const { data: invoiceId, isLoading, isError, error } = useInvoiceId();

  const [formData, setFormData] = useState({
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
    createdAt: todaysDate,
    paymentDue: todaysDate,
    paymentTerms: '0',
    status: 'draft',
    amountDueTotal: 0,
    items: itemsArray,
  });

  // Set Invoice id from saved value in db
  useEffect(() => {
    setFormData((prev) => ({ ...prev, id: invoiceId }));
  }, [isLoading, invoiceId]);

  // add new Invoice
  const { newInvoiceMutation } = useAddNewInvoice(formData);

  // update invoiceId
  const { updateIdMutation } = useUpdateInvoiceId();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    newInvoiceMutation.mutate({
      invoiceId,
      invoiceData: { ...formData },
    });
    // increase invoice id by one
    updateIdMutation.mutate();

    dispatch({ type: 'toggleInvoiceForm' });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    newInvoiceMutation.reset();
    dispatch({ type: 'hideInvoiceForm' });
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, items: itemsArray }));
  }, [itemsArray, setFormData]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, createdAt: todaysDate }));
  }, [todaysDate, setFormData]);

  if (isLoading) return 'Loading....';
  if (isError) return `An error has occurred ${error}`;

  return (
    <InvoiceForm
      formData={formData}
      setFormData={setFormData}
      handleFormSubmit={handleFormSubmit}
      itemsArray={itemsArray}
      setItemsArray={setItemsArray}
      handleCancel={handleCancel}
    />
  );
}

export default NewInvoiceForm;
