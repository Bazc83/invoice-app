import { EditInvoiceForm } from '@/components/EditInvoiceForm';
import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceButtons } from '@/components/InvoiceButtons';
import { InvoiceItems } from '@/components/InvoiceItems';
import { InvoiceItemsAmountDue } from '@/components/InvoiceItemsAmountDue';
import { InvoiceItemsTable } from '@/components/InvoiceItemsTable';
import { PaymentStatus } from '@/components/PaymentStatus';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useFormatDate } from '@/hooks/useFormatDate';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Invoice.module.css';

export const Invoice = () => {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  const { getDate } = useFormatDate();

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const handleCloseForm = () => {
    if (!showInvoiceForm) return;
    setShowInvoiceForm(false);
  };

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div className={styles.invoice}>
      {showInvoiceForm && (
        <EditInvoiceForm setShowInvoiceForm={setShowInvoiceForm} />
      )}

      <div
        onClick={handleCloseForm}
        className={`${styles.mainWrapper} ${
          showInvoiceForm && styles.mainWrapperOverlay
        }`}>
        <div className={` container ${styles.invoiceWrapper} text`}>
          {/* Go back to invoices page link */}
          <GoBackLink linkPath={'/invoices'} />

          {/* Payment status and buttons for screens > mobile */}
          <div className={`container secondary-bg ${styles.statusAndButtons}`}>
            <div className={`secondary-bg ${styles.status}`}>
              <p>Status</p>

              <PaymentStatus status={invoiceData?.status} />
            </div>

            {/* Another InvoiceButtons component further down */}
            <div className={styles.buttonWrapperTop}>
              <InvoiceButtons setShowInvoiceForm={setShowInvoiceForm} />
            </div>
          </div>

          {/* Invoice main content */}
          <div className={`secondary-bg ${styles.invoiceMain}`}>
            <div className={styles.refAndDescription}>
              <h4 className={styles.ref}>
                <span className={styles.refHash}>#</span>
                {invoiceData?.id}
              </h4>

              <p className={`text-faded ${styles.description}`}>
                {invoiceData?.description}
              </p>
            </div>

            <div className={`text-faded-xs ${styles.address}`}>
              <p>{invoiceData?.senderStreet}</p>
              <p>{invoiceData?.senderCity}</p>
              <p>{invoiceData?.senderPostCode}</p>
              <p>{invoiceData?.senderCountry}</p>
            </div>

            <div className={styles.dates}>
              <div className={styles.createdAt}>
                <p className='text-faded'>Invoice Date</p>
                <h3>
                  {invoiceData?.createdAt && getDate(invoiceData?.createdAt)}
                </h3>
              </div>

              <div className={styles.paymentDue}>
                <p className='text-faded'>Payment Due</p>
                <h3>
                  {invoiceData?.paymentDue && getDate(invoiceData?.paymentDue)}
                </h3>
              </div>
            </div>

            <div className={styles.clientDetails}>
              <p className={`text-faded`}>Bill To</p>
              <h3>{invoiceData?.clientName}</h3>

              <div className={`text-faded-xs ${styles.clientAddress}`}>
                <p>{invoiceData?.clientStreet}</p>
                <p>{invoiceData?.clientCity}</p>
                <p>{invoiceData?.clientPostCode}</p>
                <p>{invoiceData?.clientCountry}</p>
              </div>
            </div>

            <div className={styles.clientEmail}>
              <p className={`text-faded-xs`}>Sent to</p>
              <h3>{invoiceData?.clientEmail}</h3>
            </div>

            <div className={styles.itemsWrapper}>
              {/* hidden screens smaller than 678px */}

              <InvoiceItemsTable items={invoiceData?.items} />

              {/* Hidden screens bigger than 678px */}
              <InvoiceItems items={invoiceData?.items} />

              <InvoiceItemsAmountDue amountDue={invoiceData?.amountDueTotal} />
            </div>
          </div>
        </div>

        {/* Other InvoiceButtons component */}
        <div className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
          <InvoiceButtons
            setShowInvoiceForm={setShowInvoiceForm}
            invoiceId={invoiceId}
          />
        </div>
      </div>
    </div>
  );
};
