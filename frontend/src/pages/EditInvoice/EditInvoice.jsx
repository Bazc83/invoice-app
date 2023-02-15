import { useNavigate, useParams } from 'react-router';

import useModalStore from '@/context/useModalStore';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';

import { InvoiceForm } from '../../components/InvoiceForm';

export function EditInvoice() {
  const { invoiceId } = useParams();

  const showConfirmationModal = useModalStore((s) => s.showConfirmationModal);

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  // Update Invoice
  const { updateInvoiceMutation } = useUpdateInvoice();

  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    updateInvoiceMutation.mutate({
      invoiceId: data.id,
      invoiceData: data,
    });

    navigate('/');
  };

  const handleCancel = () => {
    showConfirmationModal();
  };

  if (isLoading) return 'Loading...';

  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <InvoiceForm
      invoiceData={invoiceData}
      handleFormSubmit={handleFormSubmit}
      handleCancel={handleCancel}
    />
  );
}

export default EditInvoice;
