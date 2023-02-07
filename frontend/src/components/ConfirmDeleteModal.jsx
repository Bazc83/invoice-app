import { useNavigate, useParams } from 'react-router-dom';

import useModalStore from '@/context/useModalStore';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';

import ConfirmActionModalTemplate from './ConfirmActionModalTemplate';

export function ConfirmDeleteModal() {
  const { invoiceId } = useParams();

  const hideDeleteModal = useModalStore((s) => s.hideDeleteModal);
  const { deleteSelectedInvoice } = useDeleteInvoice();

  const navigate = useNavigate();

  const confirmActionFunction = async () => {
    await deleteSelectedInvoice(invoiceId);

    navigate('/');
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
    />
  );
}

export default ConfirmDeleteModal;
