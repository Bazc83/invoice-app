import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceButtons } from '@/components/InvoiceButtons';
import { InvoiceForm } from '@/components/InvoiceForm';
import { useInvoiceContext } from '@/context/useInvoiceContext';
import { useState } from 'react';
import styles from './Invoice.module.css';
import { InvoiceContent } from './InvoiceContent';
import { PaymentStatusAndButtons } from './PaymentStatusAndButtons';

export const Invoice = () => {
  const [showEdit, setShowEdit] = useState(false);

  const { isLoading, isError, error, invoiceData } = useInvoiceContext();
  // If I move the use context to children
  // I could do away with invoicewrapper for context

  // todo  check above

  //
  //
  //

  //
  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  if (invoiceData)
    return (
      <div className={styles.invoice}>
        {showEdit && <InvoiceForm setShowForm={setShowEdit} />}

        <div
          className={`${styles.mainWrapper} ${
            showEdit && styles.mainWrapperOverlay
          }`}>
          <div className={` container ${styles.invoiceWrapper} text`}>
            {/* Go back to invoices page link */}
            <GoBackLink linkPath={'/invoices'} />

            {/* Payment status and buttons for screens > mobile */}
            <PaymentStatusAndButtons
              setShowEdit={setShowEdit}
              invoiceData={invoiceData}
            />

            {/* Invoice main content */}
            <InvoiceContent setShowEdit={setShowEdit} />
          </div>

          {/* Other InvoiceButtons component */}
          <div
            className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
            <InvoiceButtons setShowEdit={setShowEdit} />
          </div>
        </div>
      </div>
    );
};
