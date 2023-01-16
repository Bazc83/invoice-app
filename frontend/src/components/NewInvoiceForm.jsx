import { useAddNewInvoice } from '@/hooks/reactQueryHooks/useAddNewInvoice';
import { useUpdateInvoiceId } from '@/hooks/reactQueryHooks/useUpdateInvoiceId';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { InvoiceForm } from './InvoiceForm';

export const NewInvoiceForm = ({ setShowInvoiceForm }) => {


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
    createdAt: '',
    paymentDue: '',
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
      invoiceId: invoiceId,
      invoiceData: { ...formData },
    });
    // increase invoice id by one
    updateIdMutation.mutate();
    setShowInvoiceForm((prev) => !prev);
  };



  useEffect(() => {
    setFormData((prev) => ({ ...prev, items: itemsArray }));
  }, [itemsArray, setFormData]);

  if (isLoading) return 'Loading....';
  if (isError) return `An error has occurred ${error}`;

  return (
    <InvoiceForm
      formData={formData}
      setFormData={setFormData}
      handleFormSubmit={handleFormSubmit}
      setShowInvoiceForm={setShowInvoiceForm}
      itemsArray={itemsArray}
      setItemsArray={setItemsArray}
    />
  );
};
