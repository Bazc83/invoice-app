import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceForm } from '@/pages/Invoices/Invoice/InvoiceForm';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInvoices } from '../../../features/invoice/invoicesSlice';
import { useFormatDate } from '../../../hooks/useFormatDate';
import styles from './Invoice.module.css';
import { InvoiceButtons } from './InvoiceButtons';
import { InvoiceItems } from './InvoiceItems';
import { InvoiceItemsAmountDue } from './InvoiceItemsAmountDue';
import { InvoiceItemsTable } from './InvoiceItemsTable';

export const Invoice = () => {
  const { invoiceId } = useParams();
  const [showEdit, setShowEdit] = useState(false);

  // const [invoice, setInvoice] = useState();
  const dispatch = useDispatch();
  const { getDate } = useFormatDate();

  const [invoice, setInvoice] = useState();

  const { invoices, isLoading } = useSelector((state) => state.invoices);

  useEffect(() => {
    setInvoice(invoices?.filter((invoice) => invoice.id === invoiceId)[0]);
  }, []);

  useEffect(() => {
    dispatch(getInvoices());
  }, []);

  // if (isLoading) return null;
  return (
    <div>
      <div className={styles.invoice}>
        {showEdit && (
          <InvoiceForm
            setShowForm={setShowEdit}
            invoice={invoice}
            paramsInvoiceId={invoiceId}
          />
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
