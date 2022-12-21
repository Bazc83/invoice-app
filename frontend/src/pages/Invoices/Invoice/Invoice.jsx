import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceForm } from '@/pages/Invoices/Invoice/InvoiceForm';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInvoice } from '../../../features/invoice/invoicesSlice';
import styles from './Invoice.module.css';
import { InvoiceButtons } from './InvoiceButtons';
import { InvoiceMain } from './InvoiceMain';

export const Invoice = () => {
  const { invoiceId } = useParams();
  const [showEdit, setShowEdit] = useState(false);
  const [invoice, setInvoice] = useState();
  const dispatch = useDispatch();

  const { invoices, isLoading } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(getInvoice(invoiceId));
  }, []);

  useEffect(() => {
    const invoiceData = invoices?.filter((invoice) => invoice.id === invoiceId);
    setInvoice(invoiceData[0]);
  }, [invoices]);

  if (isLoading) return null;

  return (
    <div>
      <div className={styles.invoice}>
        {showEdit && (
          <InvoiceForm setShowForm={setShowEdit} invoice={invoice} />
        )}

        <div
          className={`${styles.mainWrapper} ${
            showEdit && styles.mainWrapperOverlay
          }`}>
          <div className={` container ${styles.invoiceWrapper}`}>
            {/* Go back to invoices page link */}
            <GoBackLink linkPath={'/invoices'} />

            <div className={`${styles.invoiceContent} text`}>
              <div
                className={`container secondary-bg ${styles.statusAndButtons}`}>
                <div className={`secondary-bg ${styles.status}`}>
                  <p>Status</p>
                  <PaymentStatus status={invoice?.status} />
                </div>

                <div className={styles.buttonWrapperTop}>
                  <InvoiceButtons setShowEdit={setShowEdit} />
                </div>
              </div>
              {invoice !== undefined && (
                <InvoiceMain invoiceId={invoiceId} invoice={invoice} />
              )}
            </div>
          </div>

          <div
            className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
            <InvoiceButtons setShowEdit={setShowEdit} />
          </div>
        </div>
      </div>
    </div>
  );
};
