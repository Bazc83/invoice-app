import { DarkModeContext } from '@/App';
import { PaymentStatus } from '@/components/PaymentStatus';
import data from '@data/data.json';
import { useContext, useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { InvoiceItem } from './InvoiceItem';
import styles from './styles/Invoice.module.css';

export const Invoice = () => {
  const { light } = useContext(DarkModeContext);
  const { invoiceId } = useParams();
  const [invoiceState, setInvoiceState] = useState();
  const invoiceBackgroundColor = {
    '--invoiceBackgroundColor': `${light ? '#FFFFFF' : '#1E2139'}`,
  };

  const fadedText = { color: `${light ? '#7E88C3' : '#DFE3FA'}` };

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

      <div className={styles.invoiceContent}>
        {/* Invoice status */}
        <div className={styles.invoiceStatus} style={invoiceBackgroundColor}>
          <p>Status</p>
          <PaymentStatus status={invoiceState?.status} light={light} />
        </div>

        {/* Invoice main content */}
        <div className={styles.invoiceMain} style={invoiceBackgroundColor}>
          {/* reference */}
          <h4>
            <span className={styles.invoiceRefHash}>#</span>
            {invoiceState?.id}
          </h4>

          {/* description */}
          <p className='text' style={fadedText}>
            {invoiceState?.description}
          </p>

          {/* sender address */}
          <div className={`text-xs`} style={fadedText}>
            <p>{invoiceState?.senderAddress.street}</p>
            <p>{invoiceState?.senderAddress.city}</p>
            <p>{invoiceState?.senderAddress.postCode}</p>
            <p>{invoiceState?.senderAddress.country}</p>
          </div>

          <div className='text' style={fadedText}>
            {/* created at date */}
            <div>
              <p>Invoice Date</p>
              <h2>{invoiceState?.createdAt}</h2>
            </div>

            {/* payment due date */}
            <div>
              <p>Payment Due</p>
              <h2>{invoiceState?.paymentDue}</h2>
            </div>
          </div>

          <div>
            {/* clients name */}
            <p className='text' style={fadedText}>
              Bill To
            </p>
            <h3>{invoiceState?.clientName}</h3>

            {/* clients address */}
            <div className={`text-xs`} style={fadedText}>
              <p>{invoiceState?.clientAddress.street}</p>
              <p>{invoiceState?.clientAddress.city}</p>
              <p>{invoiceState?.clientAddress.postCode}</p>
              <p>{invoiceState?.clientAddress.country}</p>
            </div>
          </div>

          {/* clients email */}
          <div>
            <p className={`text-xs`} style={fadedText}>
              Sent to
            </p>
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
