import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { EditInvoiceForm } from '@/components/EditInvoiceForm';
import { GoBackLink } from '@/components/GoBackLink';
import { PaymentStatus } from '@/components/PaymentStatus';
import { InvoiceContext } from '@/context/InvoiceContext';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { InvoiceButtons } from '@/pages/Invoice/InvoiceButtons';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Invoice.module.css';
import { InvoiceMainContent } from './InvoiceMainContent';

export const Invoice = () => {
  const { state, dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const handleCloseForm = () => {
    if (!state.showEditForm) return;
    dispatch({ type: 'hideEditForm' });
  };

  useEffect(() => {
    return () => dispatch({ type: 'resetInvoice' });
  }, [dispatch]);

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div
      className={`${styles.invoice} ${
        state.showDeleteModal && styles.confirmModalOpen
      }`}>
      {state.showDeleteModal && <ConfirmDeleteModal />}

      {state.showEditForm && <EditInvoiceForm />}

      <div
        onClick={handleCloseForm}
        className={`${styles.mainWrapper} ${
          state.showEditForm && styles.mainWrapperOverlay
        }`}>
        <div className={` container ${styles.invoiceWrapper} text`}>
          {/* Go back to invoices page link */}
          <GoBackLink linkPath={'/invoices'} />

          <div className={`secondary-bg ${styles.statusAndButtons}`}>
            <div className={`secondary-bg ${styles.status}`}>
              <p className='text'>Status</p>
              <PaymentStatus status={invoiceData?.status} />
            </div>
            <div className={styles.buttonsWrapper}>
              <InvoiceButtons />
            </div>
          </div>

          {/* Invoice main content */}
          <InvoiceMainContent invoiceData={invoiceData} />
        </div>
      </div>
    </div>
  );
};
