import useModalStore from '@/context/useModalStore';
import useUpdateInvoice from '@/hooks/reactQueryHooks/useUpdateInvoice';

import ConfirmActionModalTemplate from './ConfirmActionModalTemplate';

function CancelEditFormModal() {
  const { updateInvoiceMutation } = useUpdateInvoice();

  const hideConfirmationModal = useModalStore((s) => s.hideConfirmationModal);
  const hideAllModals = useModalStore((s) => s.hideAllModals);

  const confirmActionFunction = () => {
    hideAllModals();
    updateInvoiceMutation.reset();
  };

  const cancelActionFunction = () => {
    hideConfirmationModal();
  };

  const modalContent = {
    header: 'Confirm Cancel',
    text: `Are you sure you want to cancel ? Changes will not be saved.`,
    confirmBtn: 'Cancel Edit',
    cancelBtn: 'Back',
  };

  return (
    <ConfirmActionModalTemplate
      modalContent={modalContent}
      cancelActionFunction={cancelActionFunction}
      confirmActionFunction={confirmActionFunction}
    />
  );
}

export default CancelEditFormModal;
