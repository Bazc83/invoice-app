import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { InvoiceContext } from '@/context/InvoiceContext';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';

import ConfirmActionModal from './ConfirmActionModal';

export function ConfirmDeleteModal() {
  const { dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const { deleteSelectedInvoice } = useDeleteInvoice();

  const navigate = useNavigate();

  const confirmActionFunction = async () => {
    await deleteSelectedInvoice(invoiceId);
    navigate('/');
  };

  const cancelActionFunction = () => {
    dispatch({ type: 'hideDeleteModal' });
  };

  const header = 'Confirm Delete';
  const text = `Are you sure you want to delete invoice ${invoiceId}? This action cannot be undone`;

  return (
    <ConfirmActionModal
      header={header}
      text={text}
      cancelActionFunction={cancelActionFunction}
      confirmActionFunction={confirmActionFunction}
    />
  );
}

export default ConfirmDeleteModal;
