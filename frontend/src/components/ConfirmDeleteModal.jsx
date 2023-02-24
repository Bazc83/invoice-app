
import useModalStore from '@/context/useModalStore';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';

import ConfirmActionModalTemplate from './ConfirmActionModalTemplate';

export function ConfirmDeleteModal() {
  // get invoice id to delete
  const invoiceId = useModalStore((s) => s.invoiceId);

  const hideDeleteModal = useModalStore((s) => s.hideDeleteModal);
  const { deleteInvoiceMutation } = useDeleteInvoice();

  const confirmActionFunction = (invoiceIdValue) => {
    deleteInvoiceMutation.mutate({
      invoiceId: invoiceIdValue,
    });
  };

  const cancelActionFunction = () => {
    hideDeleteModal();
  };

  const modalContent = {
    header: 'Confirm Delete',
    text: `Are you sure you want to delete invoice ${invoiceId}? This action cannot be undone`,
    confirmBtn: 'Delete',
    cancelBtn: 'Cancel',
  };

  return (
    <ConfirmActionModalTemplate
      modalContent={modalContent}
      cancelActionFunction={cancelActionFunction}
      confirmActionFunction={confirmActionFunction}
      invoiceId={invoiceId}
    />
  );
}

export default ConfirmDeleteModal;
