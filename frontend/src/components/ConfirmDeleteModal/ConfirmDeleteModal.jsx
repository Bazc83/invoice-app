import { InvoiceContext } from '@/context/InvoiceContext';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../Button';

import styles from './ConfirmDeleteModal.module.css';

export const ConfirmDeleteModal = () => {
  const { dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const { deleteSelectedInvoice } = useDeleteInvoice();

  const navigate = useNavigate();

  const handleDeleteInvoice = async () => {
    await deleteSelectedInvoice(invoiceId);
    navigate('/');
  };

  return (
    <div className={`${styles.confirmDeleteModal}`}>
      <h1>Confirm Delete</h1>
      <p className='text-faded-lg'>
        Are you sure you want to delete invoice {invoiceId}? This action cannot
        be undone
      </p>
      <div>
        <Button
          onClick={() => dispatch({ type: 'hideDeleteModal' })}
          btnStyle={'btnThree'}>
          Cancel
        </Button>
        <Button onClick={handleDeleteInvoice} btnStyle={'btnFive'}>
          Delete
        </Button>
      </div>
    </div>
  );
};
