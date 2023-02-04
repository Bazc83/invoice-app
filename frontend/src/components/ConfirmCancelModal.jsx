import { useContext } from 'react';

import { InvoiceContext } from '@/context/InvoiceContext';
import useUpdateInvoice from '@/hooks/reactQueryHooks/useUpdateInvoice';

import ConfirmActionModalTemplate from './ConfirmActionModalTemplate';

function ConfirmCancelModal() {
  const { dispatch } = useContext(InvoiceContext);
  const { updateInvoiceMutation } = useUpdateInvoice();

  const confirmActionFunction = () => {
    updateInvoiceMutation.reset();

    dispatch({ type: 'hideEditForm' });
  };
  const cancelActionFunction = () => {
    dispatch({ type: 'hideConfirmation' });
  };

  const modalContent = {
    header: 'Confirm Cancel',
    text: `Are you sure you want to cancel ? Changes will not be saved.`,
  };

  return (
    <ConfirmActionModalTemplate
      modalContent={modalContent}
      cancelActionFunction={cancelActionFunction}
      confirmActionFunction={confirmActionFunction}
    />
  );
}

export default ConfirmCancelModal;
