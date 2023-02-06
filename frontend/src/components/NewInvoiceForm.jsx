import { useContext, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { InvoiceContext } from '@/context/InvoiceContext';
import { useAddNewInvoice } from '@/hooks/reactQueryHooks/useAddNewInvoice';
import { useUpdateInvoiceId } from '@/hooks/reactQueryHooks/useUpdateInvoiceId';
import { setInvoiceDates } from '@/hooks/setInvoiceDates';
import { PageLayoutContext } from '@/pages/PageLayout';

import { InvoiceForm } from './InvoiceForm';

export function NewInvoiceForm() {
  const { state, dispatch } = useContext(InvoiceContext);
  const { setShowNewInvoiceForm } = useContext(PageLayoutContext);

  const { todaysDate } = setInvoiceDates({
    paymentTermsValue: 'Cash',
  });

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
    createdAt: todaysDate,
    paymentDue: todaysDate,
    paymentTerms: 'Cash',
    status: 'draft',
    amountDueTotal: 0,
    items: [],
    companyName: '',
  });

  // add new Invoice
  const { newInvoiceMutation } = useAddNewInvoice();

  // update invoiceId
  const { updateIdMutation } = useUpdateInvoiceId();

  const handleFormSubmit = (data) => {
    const payloadData = {
      ...data,
      items: state.itemsArray,
      paymentTerms: state?.formData?.paymentTerms,
      id: state?.formData?.id,
      createdAt: todaysDate,
      paymentDue: state?.formData?.paymentDue,
      status: invoiceData?.status,
    };
    dispatch({ type: 'setFormData', payload: payloadData });

    newInvoiceMutation.mutate({
      invoiceData: payloadData,
    });

    // increase invoice id by one
    updateIdMutation.mutate();

    setShowNewInvoiceForm(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    newInvoiceMutation.reset();

    dispatch({ type: 'resetInvoice' });
    setShowNewInvoiceForm(false);
  };

  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      createdAt: todaysDate,
      id: invoiceId,
      paymentDue: todaysDate,
    }));
  }, [todaysDate, invoiceId]);

  useEffect(() => {
    if (invoiceId === undefined) return;

    const dataPayload = {
      ...invoiceData,
      paymentTerms: 'Cash',
      paymentStatus: 'draft',
    };
    dispatch({ type: 'setFormData', payload: dataPayload });

    if (invoiceData.items.length > 0) {
      dispatch({ type: 'addItems', payload: invoiceData.items });
    }
  }, [invoiceData, dispatch, todaysDate, invoiceId]);

  if (isLoading) return 'Loading....';
  if (isError) return `An error has occurred ${error}`;

  return (
    <InvoiceForm
      invoiceData={state.formData}
      handleFormSubmit={handleFormSubmit}
      handleCancel={handleCancel}
      newForm
    />
  );
}

export default NewInvoiceForm;
