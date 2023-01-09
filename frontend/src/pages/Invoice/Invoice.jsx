import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceButtons } from '@/components/InvoiceButtons';
import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoiceItems } from '@/components/InvoiceItems';
import { InvoiceItemsAmountDue } from '@/components/InvoiceItemsAmountDue';
import { InvoiceItemsTable } from '@/components/InvoiceItemsTable';
import { PaymentStatus } from '@/components/PaymentStatus';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import useSetInvoiceData from '@/hooks/reactQueryHooks/useSetInvoiceData';
import { useFormatDate } from '@hooks/useFormatDate';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Invoice.module.css';

export const Invoice = () => {
  const [showEdit, setShowEdit] = useState(false);

  const { invoiceId } = useParams();

  const { getDate } = useFormatDate();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred: ' + error.message;

  if (invoiceData)
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
                    <PaymentStatus status={invoiceData?.status} />
                  </div>

                  {/* Another InvoiceButtons component further down */}
                  <div className={styles.buttonWrapperTop}>
                    <InvoiceButtons
                      setShowEdit={setShowEdit}
                      invoiceData={invoiceData}
                    />
                  </div>
                </div>

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
                    <p>{invoiceData?.senderAddress?.street}</p>
                    <p>{invoiceData?.senderAddress?.city}</p>
                    <p>{invoiceData?.senderAddress?.postCode}</p>
                    <p>{invoiceData?.senderAddress?.country}</p>
                  </div>

                  <div className={styles.dates}>
                    <div className={styles.createdAt}>
                      <p className='text-faded'>Invoice Date</p>
                      <h3>
                        {invoiceData?.createdAt &&
                          getDate(invoiceData?.createdAt)}
                      </h3>
                    </div>

                    <div className={styles.paymentDue}>
                      <p className='text-faded'>Payment Due</p>
                      <h3>
                        {invoiceData?.paymentDue &&
                          getDate(invoiceData?.paymentDue)}
                      </h3>
                    </div>
                  </div>

                  <div className={styles.clientDetails}>
                    <p className={`text-faded`}>Bill To</p>
                    <h3>{invoiceData?.clientName}</h3>

                    <div className={`text-faded-xs ${styles.clientAddress}`}>
                      <p>{invoiceData?.clientAddress?.street}</p>
                      <p>{invoiceData?.clientAddress?.city}</p>
                      <p>{invoiceData?.clientAddress?.postCode}</p>
                      <p>{invoiceData?.clientAddress?.country}</p>
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

                    <InvoiceItemsAmountDue amountDue={invoiceData?.total} />
                  </div>
                </div>
              </div>
            </div>

            {/* Other InvoiceButtons component */}
            <div
              className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
              <InvoiceButtons
                setShowEdit={setShowEdit}
                invoiceData={invoiceData}
              />
            </div>
          </div>
        </div>
      </div>
    );
};
