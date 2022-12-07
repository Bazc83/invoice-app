import { Button } from '@/components/Button';
import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceForm } from '@/components/InvoiceForm';
import { useFormatDate } from '@/hooks/useFormatDate';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
import data from '@data/data.json';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceItems } from '../InvoiceItems/InvoiceItems';
import { InvoiceItemsTable } from '../InvoiceItemsTable';
import styles from './Invoice.module.css';

export const Invoice = () => {
  const { invoiceId } = useParams();
  const [invoiceState, setInvoiceState] = useState();

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    setInvoiceState(data.filter((invoice) => invoice.id === invoiceId)[0]);
  }, [invoiceId]);

  const { getDate } = useFormatDate();

  
  useEffect(()=>{console.log(showEdit)},[showEdit])
  return (
    <>
    {showEdit && <InvoiceForm setShowEdit={setShowEdit}/>}
     
      <div className={`container ${styles.invoiceWrapper}`}>
        {/* Go back to invoices page link */}
        <GoBackLink linkPath={'/invoices'} />

        <div className={`${styles.invoiceContent} text`}>
          <div className={`container secondary-bg ${styles.statusAndButtons}`}>
            <div className={`secondary-bg ${styles.status}`}>
              <p>Status</p>
              <PaymentStatus status={invoiceState?.status} />
            </div>
            <div className={`${styles.buttonWrapperTop}`}>
              <Button btnStyle='btnThree'  onClick={() => setShowEdit((prev) => !prev)}>Edit</Button>
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
              {/* hidden screens smaller than 678px */}
              <InvoiceItemsTable items={invoiceState?.items} />

              {/* Hidden screens bigger than 678px */}
              <InvoiceItems items={invoiceState?.items} />

              <div className={styles.amountDue}>
                <p className='text-xs'>Amount Due</p>
                <h2>
                  {' '}
                  {new Intl.NumberFormat('en', {
                    style: 'currency',
                    currency: 'GBP',
                  }).format(invoiceState?.total)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
        <Button
          btnStyle='btnThree'
          onClick={() => setShowEdit((prev) => !prev)}>
          Edit
        </Button>
        <Button btnStyle='btnFive'>Delete</Button>
        <Button>Mark as Paid</Button>
      </div>
    </>
  );
};
