import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { InvoiceContext } from '@/context/InvoiceContext';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';

import ConfirmActionModalTemplate from './ui/ConfirmActionModalTemplate';

export function ConfirmDeleteModal({ invoiceId }) {
  const { dispatch } = useContext(InvoiceContext);

  const { deleteSelectedInvoice } = useDeleteInvoice();

  const navigate = useNavigate();

  const confirmActionFunction = async () => {
    await deleteSelectedInvoice(invoiceId);
    navigate('/');
  };

  const cancelActionFunction = () => {
    dispatch({ type: 'hideDeleteModal' });
  };

  const modalContent = {
    header: 'Confirm Delete',
    text: `Are you sure you want to delete invoice ${invoiceId}? This action cannot be undone`,
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
