import { Button } from '@/components/Button';
import { InvoiceContext } from '@/context/InvoiceContext';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import styles from './InvoiceButtons.module.css';

export const InvoiceButtons = () => {
  const { dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const { updateInvoiceMutation } = useUpdateInvoice();

  const setStatus = (statusValue) => {
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: { ...invoiceData, status: statusValue },
    });
  };

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <>
      {invoiceData?.status === 'draft' && (
        <div className={styles.invoiceBtn}>
          <Button
            btnStyle='btnThree'
            onClick={() => dispatch({ type: 'showEditForm' })}
            fullWidth>
            Edit
          </Button>
        </div>
      )}
      <div className={styles.invoiceBtn}>
        <Button
          btnStyle='btnFive'
          onClick={() => dispatch({ type: 'showDeleteModal' })}
          fullWidth>
          {isLoading ? '...Deleting' : 'Delete'}
        </Button>
      </div>

      {invoiceData?.status !== 'paid' && invoiceData?.status !== 'draft' && (
        <div className={styles.invoiceBtn}>
          <Button onClick={() => setStatus('paid')} fullWidth>
            Paid
          </Button>
        </div>
      )}

      {invoiceData?.status === 'draft' && (
        <div className={styles.invoiceBtn}>
          <Button onClick={() => setStatus('pending')} fullWidth>
            Pending
          </Button>
        </div>
      )}

      {invoiceData?.status !== 'draft' &&
        invoiceData?.status === 'pending' &&
        invoiceData?.status !== 'paid' && (
          <div className={styles.invoiceBtn}>
            <Button onClick={() => setStatus('draft')} fullWidth>
              Draft
            </Button>
          </div>
        )}
    </>
  );
};
