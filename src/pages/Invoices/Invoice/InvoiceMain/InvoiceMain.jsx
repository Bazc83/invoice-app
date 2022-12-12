import { useFormatDate } from '@/hooks/useFormatDate';
import { useEffect } from 'react';
import { useInvoiceData } from '../../../../hooks/useInvoiceData';
import { useInvoiceSubCollectionData } from '../../../../hooks/useInvoiceSubCollectionData';
import { InvoiceItems } from '../InvoiceItems';
import { InvoiceItemsAmountDue } from '../InvoiceItemsAmountDue';
import { InvoiceItemsTable } from '../InvoiceItemsTable';
import styles from './InvoiceMain.module.css';
export const InvoiceMain = ({ invoiceState, invoiceId }) => {
  const { getDate } = useFormatDate();

  const { data, mainInvoiceData } = useInvoiceData();

  const { subCollectionData, getSubCollectionData } =
    useInvoiceSubCollectionData();
  useEffect(() => {
    mainInvoiceData(invoiceId);
    getSubCollectionData(invoiceId);
  }, []);

  console.log(subCollectionData);
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
        <p>{invoiceState?.senderAddress.street}</p>
        <p>{invoiceState?.senderAddress.city}</p>
        <p>{invoiceState?.senderAddress.postCode}</p>
        <p>{invoiceState?.senderAddress.country}</p>
      </div>

      <div className={styles.dates}>
        <div className={styles.createdAt}>
          <p className='text-faded'>Invoice Date</p>
          <h3>{data?.createdAt && getDate(data.createdAt)}</h3>
        </div>

        <div className={styles.paymentDue}>
          <p className='text-faded'>Payment Due</p>
          <h3>{data?.paymentDue && getDate(data.paymentDue)}</h3>
        </div>
      </div>

      <div className={styles.clientDetails}>
        <p className={`text-faded`}>Bill To</p>
        <h3>{data?.clientName}</h3>

        <div className={`text-faded-xs ${styles.clientAddress}`}>
          <p>{invoiceState?.clientAddress.street}</p>
          <p>{invoiceState?.clientAddress.city}</p>
          <p>{invoiceState?.clientAddress.postCode}</p>
          <p>{invoiceState?.clientAddress.country}</p>
        </div>
      </div>

      <div className={styles.clientEmail}>
        <p className={`text-faded-xs`}>Sent to</p>
        <h3>{data?.clientEmail}</h3>
      </div>

      <div className={styles.itemsWrapper}>
        {/* hidden screens smaller than 678px */}
        <InvoiceItemsTable items={data?.items} />

        {/* Hidden screens bigger than 678px */}
        <InvoiceItems items={invoiceState?.items} />

        <InvoiceItemsAmountDue invoiceState={invoiceState} />
      </div>
    </div>
  );
};
