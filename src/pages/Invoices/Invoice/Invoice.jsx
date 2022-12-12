import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceForm } from '@/pages/Invoices/Invoice/InvoiceForm';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
import { useInvoiceData } from '@hooks/useInvoiceData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Invoice.module.css';
import { InvoiceButtons } from './InvoiceButtons';
import { InvoiceMain } from './InvoiceMain';

export const Invoice = () => {
  const { invoiceId } = useParams();

  const [showEdit, setShowEdit] = useState(false);

  const { mainInvoiceData, data } = useInvoiceData();

  useEffect(() => {
    mainInvoiceData(invoiceId);
  }, [invoiceId]);

  return (
    <div className={styles.invoice}>
      {showEdit && <InvoiceForm setShowEdit={setShowEdit} />}

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
                <PaymentStatus status={data?.status} />
              </div>

              <div className={styles.buttonWrapperTop}>
                <InvoiceButtons setShowEdit={setShowEdit} />
              </div>
            </div>

            <InvoiceMain invoiceId={invoiceId} />
          </div>
        </div>

        <div className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
          <InvoiceButtons setShowEdit={setShowEdit} />
        </div>
      </div>
    </div>
  );
};
