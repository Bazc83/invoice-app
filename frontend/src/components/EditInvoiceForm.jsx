import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceForm } from './InvoiceForm';

export const EditInvoiceForm = ({ setShowInvoiceForm }) => {
  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const [formData, setFormData] = useState(invoiceData);

  // Update Invoice
  const { updateInvoiceMutation } = useUpdateInvoice();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: formData,
    });
    setShowInvoiceForm((prev) => !prev);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    updateInvoiceMutation.reset();
    setShowInvoiceForm(false);
  };



  useEffect(() => {
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: formData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <InvoiceForm
      // invoiceData={invoiceData}
      formData={formData}
      setFormData={setFormData}
      handleFormSubmit={handleFormSubmit}
      setShowInvoiceForm={setShowInvoiceForm}
      handleCancelEdit={handleCancelEdit}
    />
  );
};
