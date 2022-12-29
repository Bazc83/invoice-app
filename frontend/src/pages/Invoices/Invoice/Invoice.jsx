import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceForm } from '@/pages/Invoices/Invoice/InvoiceForm';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
import { useFormatDate } from '@hooks/useFormatDate';
import { getInvoice } from '@hooks/useInvoicesApi.js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Invoice.module.css';
import { InvoiceButtons } from './InvoiceButtons';
import { InvoiceItems } from './InvoiceItems';
import { InvoiceItemsAmountDue } from './InvoiceItemsAmountDue';
import { InvoiceItemsTable } from './InvoiceItemsTable';

export const Invoice = () => {
  const { invoiceId } = useParams();

  const { getDate } = useFormatDate();
  const {
    isLoading,
    isError,
    error,
    data: invoice,
  } = useQuery(['invoice'], () => getInvoice(invoiceId));

  const [showEdit, setShowEdit] = useState(false);

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <div className={styles.invoice}>
        {showEdit && (
          <InvoiceForm setShowForm={setShowEdit} invoiceId={invoiceId} />
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
                  <InvoiceButtons setShowEdit={setShowEdit} invoice={invoice} />
                </div>
              </div>

              <div className={`secondary-bg ${styles.invoiceMain}`}>
                <div className={styles.refAndDescription}>
                  <h4 className={styles.ref}>
                    <span className={styles.refHash}>#</span>
                    {invoice?.id}
                  </h4>

                  <p className={`text-faded ${styles.description}`}>
                    {invoice?.description}
                  </p>
                </div>

                <div className={`text-faded-xs ${styles.address}`}>
                  <p>{invoice?.senderAddress?.street}</p>
                  <p>{invoice?.senderAddress?.city}</p>
                  <p>{invoice?.senderAddress?.postCode}</p>
                  <p>{invoice?.senderAddress?.country}</p>
                </div>

                <div className={styles.dates}>
                  <div className={styles.createdAt}>
                    <p className='text-faded'>Invoice Date</p>
                    <h3>{invoice?.createdAt && getDate(invoice?.createdAt)}</h3>
                  </div>

                  <div className={styles.paymentDue}>
                    <p className='text-faded'>Payment Due</p>
                    <h3>
                      {invoice?.paymentDue && getDate(invoice?.paymentDue)}
                    </h3>
                  </div>
                </div>

                <div className={styles.clientDetails}>
                  <p className={`text-faded`}>Bill To</p>
                  <h3>{invoice?.clientName}</h3>

                  <div className={`text-faded-xs ${styles.clientAddress}`}>
                    <p>{invoice?.clientAddress?.street}</p>
                    <p>{invoice?.clientAddress?.city}</p>
                    <p>{invoice?.clientAddress?.postCode}</p>
                    <p>{invoice?.clientAddress?.country}</p>
                  </div>
                </div>

                <div className={styles.clientEmail}>
                  <p className={`text-faded-xs`}>Sent to</p>
                  <h3>{invoice?.clientEmail}</h3>
                </div>

                <div className={styles.itemsWrapper}>
                  {/* hidden screens smaller than 678px */}

                  <InvoiceItemsTable items={invoice?.items} />

                  {/* Hidden screens bigger than 678px */}
                  <InvoiceItems items={invoice?.items} />

                  <InvoiceItemsAmountDue amountDue={invoice?.total} />
                </div>
              </div>
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
