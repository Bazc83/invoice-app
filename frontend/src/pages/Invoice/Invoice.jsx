import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceButtons } from '@/components/InvoiceButtons';
import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoiceContextProvider } from '@/context/useInvoiceContext';
import { useState } from 'react';
import styles from './Invoice.module.css';
import { InvoiceContent } from './InvoiceContent';
import { PaymentStatusAndButtons } from './PaymentStatusAndButtons';

export const Invoice = () => {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  return (
    <InvoiceContextProvider>
      <div className={styles.invoice}>
        {showInvoiceForm && (
          <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} />
        )}

        <div
          className={`${styles.mainWrapper} ${
            showInvoiceForm && styles.mainWrapperOverlay
          }`}>
          <div className={` container ${styles.invoiceWrapper} text`}>
            {/* Go back to invoices page link */}
            <GoBackLink linkPath={'/invoices'} />

            {/* Payment status and buttons for screens > mobile */}
            <PaymentStatusAndButtons setShowInvoiceForm={setShowInvoiceForm} />

            {/* Invoice main content */}
            <InvoiceContent setShowInvoiceForm={setShowInvoiceForm} />
          </div>

          {/* Other InvoiceButtons component */}
          <div
            className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
            <InvoiceButtons setShowInvoiceForm={setShowInvoiceForm} />
          </div>
        </div>
      </div>
    </InvoiceContextProvider>
  );
};
