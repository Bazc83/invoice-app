import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceForm } from './InvoiceForm';

export const EditInvoiceForm = ({ setShowInvoiceForm }) => {
  // const { invoiceData, setInvoiceData, invoiceId } = useInvoiceContext();

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const [formData, setFormData] = useState(invoiceData);

  // Update Invoice
  const { updateInvoiceData } = useUpdateInvoice();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateInvoiceData(invoiceId, formData);
    setShowInvoiceForm((prev) => !prev);
  };

  useEffect(() => {
    updateInvoiceData(invoiceId, formData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <InvoiceForm
      invoiceData={invoiceData}
      setFormData={setFormData}
      handleFormSubmit={handleFormSubmit}
      setShowInvoiceForm={setShowInvoiceForm}
    />
  );
};
