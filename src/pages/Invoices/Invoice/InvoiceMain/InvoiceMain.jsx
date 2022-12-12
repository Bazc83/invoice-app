import { useFormatDate } from '@/hooks/useFormatDate';
import { useEffect } from 'react';
import { useInvoiceData } from '@hooks/useInvoiceData';
import { useSubCollection } from '@hooks/useSubCollection';
import { InvoiceItems } from '../InvoiceItems';
import { InvoiceItemsAmountDue } from '../InvoiceItemsAmountDue';
import { InvoiceItemsTable } from '../InvoiceItemsTable';
import styles from './InvoiceMain.module.css';
export const InvoiceMain = ({ invoiceId }) => {
  const senderAddress = {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  };

  const { getDate } = useFormatDate();

  const { data, mainInvoiceData } = useInvoiceData();

  const { subCollectionData, getSubCollectionData } = useSubCollection();

  useEffect(() => {
    mainInvoiceData(invoiceId);
    getSubCollectionData(invoiceId, 'clientAddress');
  }, []);

  return (
    <div className={`secondary-bg ${styles.invoiceMain}`}>
      <div className={styles.refAndDescription}>
        <h4 className={styles.ref}>
          <span className={styles.refHash}>#</span>
          {data?.id}
        </h4>

        <p className={`text-faded ${styles.description}`}>
          {data?.description}
        </p>
      </div>

      <div className={`text-faded-xs ${styles.address}`}>
        <p>{senderAddress.street}</p>
        <p>{senderAddress.city}</p>
        <p>{senderAddress.postCode}</p>
        <p>{senderAddress.country}</p>
      </div>

      <div className={styles.dates}>
        <div className={styles.createdAt}>
          <p className='text-faded'>Invoice Date</p>
          <h3>{data?.createdAt && getDate(data?.createdAt)}</h3>
        </div>

        <div className={styles.paymentDue}>
          <p className='text-faded'>Payment Due</p>
          <h3>{data?.paymentDue && getDate(data?.paymentDue)}</h3>
        </div>
      </div>

      <div className={styles.clientDetails}>
        <p className={`text-faded`}>Bill To</p>
        <h3>{data?.clientName}</h3>

        <div className={`text-faded-xs ${styles.clientAddress}`}>
          <p>{subCollectionData[0]?.street}</p>
          <p>{subCollectionData[0]?.city}</p>
          <p>{subCollectionData[0]?.postCode}</p>
          <p>{subCollectionData[0]?.country}</p>
        </div>
      </div>

      <div className={styles.clientEmail}>
        <p className={`text-faded-xs`}>Sent to</p>
        <h3>{data?.clientEmail}</h3>
      </div>

      <div className={styles.itemsWrapper}>
        {/* hidden screens smaller than 678px */}

        <InvoiceItemsTable invoiceId={invoiceId} />

        {/* Hidden screens bigger than 678px */}
        <InvoiceItems invoiceId={invoiceId} />

        <InvoiceItemsAmountDue amountDue={data?.total} />
      </div>
    </div>
  );
};
