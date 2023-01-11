import { useInvoiceContext } from '@/context/useInvoiceContext';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { InvoiceForm } from './InvoiceForm';

export const EditInvoiceForm = ({ setShowInvoiceForm }) => {
  const { invoiceData, setInvoiceData, invoiceId } = useInvoiceContext();

  // Update Invoice
  const { updateInvoiceMutation } = useUpdateInvoice(invoiceId, invoiceData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: { ...invoiceData },
    });
    setShowInvoiceForm((prev) => !prev);
  };

  return (
    <InvoiceForm
      invoiceData={invoiceData}
      setInvoiceData={setInvoiceData}
      handleFormSubmit={handleFormSubmit}
      setShowInvoiceForm={setShowInvoiceForm}
    />
  );
};
