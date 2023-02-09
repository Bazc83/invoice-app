import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import useModalStore from '@/context/useModalStore';
import useNewInvoiceStore from '@/context/useNewInvoiceStore';
import { useAddNewInvoice } from '@/hooks/reactQueryHooks/useAddNewInvoice';
import { useUpdateInvoiceId } from '@/hooks/reactQueryHooks/useUpdateInvoiceId';
import { setInvoiceDates } from '@/hooks/setInvoiceDates';

import { InvoiceForm } from '../../components/InvoiceForm';

export function NewInvoice() {
  const useInvoiceId = () =>
    useQuery({
      queryKey: ['invoiceId'],
      queryFn: async () => {
        const response = await axios.get('/api/invoiceId');
        return response.data[0].invoiceId;
      },
    });

  const { data: idData } = useInvoiceId();

  const [invoiceId, setInvoiceId] = useState(null);

  const invoiceData = useNewInvoiceStore((s) => s.invoiceData);
  const updateInvoiceId = useNewInvoiceStore((s) => s.updateInvoiceId);
  const updateCreatedAt = useNewInvoiceStore((s) => s.updateCreatedAt);
  const updatePaymentDue = useNewInvoiceStore((s) => s.updatePaymentDue);
  const resetNewInvoice = useNewInvoiceStore((s) => s.resetNewInvoice);
  const { todaysDate } = setInvoiceDates({
    paymentTermsValue: 'Cash',
  });

  const navigate = useNavigate();

  const { newInvoiceMutation } = useAddNewInvoice();

  // update invoiceId
  const { updateIdMutation } = useUpdateInvoiceId();

  const handleFormSubmit = (data) => {

    console.log("data, ", data)
    newInvoiceMutation.mutate({
      invoiceData: data,
    });

    // increase invoice id by one
    updateIdMutation.mutate();

    resetNewInvoice();
    navigate(`/`);
  };

  const showConfirmationModal = useModalStore((s) => s.showConfirmationModal);

  // Handle cancel adding new invoice
  const handleCancel = () => {
    showConfirmationModal();
  };

  useEffect(() => {
    updateCreatedAt(todaysDate);
    updatePaymentDue(todaysDate);
    updateInvoiceId(idData);
    setInvoiceId(idData);
  }, [idData, todaysDate, updateCreatedAt, updateInvoiceId, updatePaymentDue]);

  if (!invoiceId) return <div>Loading ...</div>;
  return (
    <InvoiceForm
      invoiceData={invoiceData}
      handleFormSubmit={handleFormSubmit}
      handleCancel={handleCancel}
      newInvoiceMutation={newInvoiceMutation}
    />
  );
}

export default NewInvoice;
