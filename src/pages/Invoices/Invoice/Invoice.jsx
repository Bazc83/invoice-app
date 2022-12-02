import { Button } from '@/components/Button';
import { useFormatDate } from '@/hooks/useFormatDate';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
import data from '@data/data.json';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { InvoiceItem } from './InvoiceItem';
import { InvoiceItems } from './InvoiceItems';
import styles from './styles/Invoice.module.css';

export const Invoice = () => {
  const { invoiceId } = useParams();
  const [invoiceState, setInvoiceState] = useState();

  useEffect(() => {
    setInvoiceState(data.filter((invoice) => invoice.id === invoiceId)[0]);
  }, [invoiceId]);

  const { getDate } = useFormatDate();

  return (
    <>
      <div className={` container ${styles.invoiceWrapper}`}>
        {/* Go back to invoices page link */}
        <div className={styles.goBackLinkWrapper}>
          <FaChevronLeft className={styles.iconLeft} />
          <Link to='/invoices' className={styles.goBackLink}>
            Go back
          </Link>
        </div>

        <div className={`${styles.invoiceContent} text`}>
          <div className={`container secondary-bg ${styles.statusAndButtons}`}>
            <div className={`secondary-bg ${styles.status}`}>
              <p>Status</p>
              <PaymentStatus status={invoiceState?.status} />
            </div>
            <div className={`${styles.buttonWrapperTop}`}>
              <Button btnStyle='btnThree'>Edit</Button>
              <Button btnStyle='btnFive'>Delete</Button>
              <Button>Mark as Paid</Button>
            </div>
          </div>
          <div className={`secondary-bg ${styles.invoiceMain}`}>
            <div className={styles.refAndDescription}>
              <h4 className={styles.ref}>
                <span className={styles.refHash}>#</span>
                {invoiceState?.id}
              </h4>

              <p className={`text-faded ${styles.description}`}>
                {invoiceState?.description}
              </p>
            </div>

            <div className={`text-faded-xs ${styles.address}`}>
              <p>{invoiceState?.senderAddress.street}</p>
              <p>{invoiceState?.senderAddress.city}</p>
              <p>{invoiceState?.senderAddress.postCode}</p>
              <p>{invoiceState?.senderAddress.country}</p>
            </div>

            <div className={styles.dates}>
              <div className={styles.createdAt}>
                <p className='text-faded'>Invoice Date</p>
                <h3>
                  {invoiceState?.createdAt && getDate(invoiceState.createdAt)}
                </h3>
              </div>

              <div className={styles.paymentDue}>
                <p className='text-faded'>Payment Due</p>
                <h3>
                  {invoiceState?.paymentDue && getDate(invoiceState.paymentDue)}
                </h3>
              </div>
            </div>

            <div className={styles.clientDetails}>
              <p className={`text-faded`}>Bill To</p>
              <h3>{invoiceState?.clientName}</h3>

              <div className={`text-faded-xs ${styles.clientAddress}`}>
                <p>{invoiceState?.clientAddress.street}</p>
                <p>{invoiceState?.clientAddress.city}</p>
                <p>{invoiceState?.clientAddress.postCode}</p>
                <p>{invoiceState?.clientAddress.country}</p>
              </div>
            </div>

            <div className={styles.clientEmail}>
              <p className={`text-faded-xs`}>Sent to</p>
              <h3>{invoiceState?.clientEmail}</h3>
            </div>

            <div className={styles.itemsWrapper}>
              <div className={styles.items}>
                <InvoiceItems items={invoiceState?.items}/>
              </div>

              <div className={styles.amountDue}>
                <p className='text-xs'>Amount Due</p>
                <h2>£ {invoiceState?.total}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
        <Button btnStyle='btnThree'>Edit</Button>
        <Button btnStyle='btnFive'>Delete</Button>
        <Button>Mark as Paid</Button>
      </div>
    </>
  );
};
