/* eslint-disable no-underscore-dangle */
import { useParams } from 'react-router';

import CancelEditFormModal from '@/components/CancelEditFormModal';
import useModalStore from '@/context/useModalStore';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import EditInvoiceForm from '@/pages/EditInvoice/EditInvoiceForm';

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
  const { updateInvoiceMutation } = useUpdateInvoice(invoiceId);

  const handleFormSubmit = (data) => {
    updateInvoiceMutation.mutate({
      invoiceId: data.id,
      invoiceData: data,
    });
  };

  const handleCancel = () => {
    showConfirmationModal();
  };

  const confirmationModal = useModalStore((s) => s.confirmationModal);

  if (isLoading) return 'Loading...';

  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <div className="primary-bg relative flex h-max flex-col pb-10 pt-6 sm:px-6 md:pt-8  ">
      {/* confirm cancel modal */}
      {confirmationModal && <CancelEditFormModal />}

      <EditInvoiceForm
        handleFormSubmit={handleFormSubmit}
        handleCancel={handleCancel}
        invoiceData={invoiceData}
      />
    </div>
  );
}

export default EditInvoice;
