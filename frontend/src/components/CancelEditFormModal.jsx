import { useNavigate } from 'react-router';

import useModalStore from '@/context/useModalStore';

import ConfirmActionModalTemplate from './ConfirmActionModalTemplate';

function CancelEditFormModal() {
  const hideConfirmationModal = useModalStore((s) => s.hideConfirmationModal);

  const navigate = useNavigate();
  const confirmActionFunction = () => {
    hideConfirmationModal();

    return navigate('/');
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
