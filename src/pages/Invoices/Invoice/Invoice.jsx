import { PaymentStatus } from '@/components/PaymentStatus';
import data from '@data/data.json';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { InvoiceItem } from './InvoiceItem';
import styles from './styles/Invoice.module.css';

export const Invoice = () => {
  const { invoiceId } = useParams();
  const [invoiceState, setInvoiceState] = useState();

  useEffect(() => {
    setInvoiceState(data.filter((invoice) => invoice.id === invoiceId)[0]);
  }, [invoiceId]);

  return (
    <div className={`container ${styles.invoiceWrapper}`}>
      {/* Go back to invoices page link */}
      <div className={styles.goBackLinkWrapper}>
        <FaChevronLeft className={styles.iconLeft} />
        <Link to='/invoices' className={styles.goBackLink}>
          Go back
        </Link>
      </div>

      <div className={`${styles.invoiceContent}`}>
        {/* Invoice status */}
        <div className={`secondary-bg ${styles.invoiceStatus}`}>
          <p>Status</p>
          <PaymentStatus status={invoiceState?.status} />
        </div>

        {/* Invoice main content */}
        <div className={`secondary-bg ${styles.invoiceMain}`}>
          {/* reference */}
          <h4 className={styles.invoiceRef}>
            <span className={styles.invoiceRefHash}>#</span>
            {invoiceState?.id}
          </h4>

          {/* description */}
          <p className={`text ${styles.invoiceDescription}`}>
            {invoiceState?.description}
          </p>

          {/* sender address */}
          <div className={`text-xs ${styles.invoiceAddress}`}>
            <p>{invoiceState?.senderAddress.street}</p>
            <p>{invoiceState?.senderAddress.city}</p>
            <p>{invoiceState?.senderAddress.postCode}</p>
            <p>{invoiceState?.senderAddress.country}</p>
          </div>

          <div className={`text ${styles.invoiceDates}`}>
            {/* created at date */}
            <div className={styles.invoiceCreatedAt}>
              <p>Invoice Date</p>
              <h2>{invoiceState?.createdAt}</h2>
            </div>

            {/* payment due date */}
            <div className={styles.invoicePaymentDue}>
              <p>Payment Due</p>
              <h2>{invoiceState?.paymentDue}</h2>
            </div>
          </div>

          <div className={styles.invoiceClientDetails}>
            {/* clients name */}
            <p className={`text  ${styles.invoiceClientName}`}>Bill To</p>
            <h3>{invoiceState?.clientName}</h3>

            {/* clients address */}
            <div className={`text-xs ${styles.invoiceClientAddress}`}>
              <p>{invoiceState?.clientAddress.street}</p>
              <p>{invoiceState?.clientAddress.city}</p>
              <p>{invoiceState?.clientAddress.postCode}</p>
              <p>{invoiceState?.clientAddress.country}</p>
            </div>
          </div>

          {/* clients email */}
          <div className={styles.invoiceClientEmail}>
            <p className={`text-xs`}>Sent to</p>
            <h3>{invoiceState?.clientEmail}</h3>
          </div>

          {/* items container */}
          <div className={styles.invoiceItemsWrapper}>
            {invoiceState?.items?.map((item, i) => {
              return <InvoiceItem item={item} key={`item${i}`} />;
            })}

            {/* Total values of items */}
            <div className={styles.amountDue}>
              <p>Amount Due</p>
              <h2>£ {invoiceState?.total}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
