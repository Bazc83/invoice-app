import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { useInvoiceContext } from '@/hooks/useContextHooks/useInvoiceContext';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceForm } from '../InvoiceForm';

export const EditInvoiceForm = () => {
  const { dispatch } = useInvoiceContext();

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const [formData, setFormData] = useState(invoiceData);

  const [itemsArray, setItemsArray] = useState(invoiceData?.items);

  // Update Invoice
  const { updateInvoiceMutation } = useUpdateInvoice();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: formData,
    });

    dispatch({ type: 'hideEditForm' });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    updateInvoiceMutation.reset();
    dispatch({ type: 'hideEditForm' });
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, items: itemsArray }));
  }, [itemsArray, setFormData]);

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <InvoiceForm
      formData={formData}
      setFormData={setFormData}
      itemsArray={itemsArray}
      setItemsArray={setItemsArray}
      handleFormSubmit={handleFormSubmit}
      handleCancel={handleCancel}
    />
  );
};
