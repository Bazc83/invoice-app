import { useFormatDate } from '@/hooks/useFormatDate';
import { InvoiceItems } from '../InvoiceItems';
import { InvoiceItemsAmountDue } from '../InvoiceItemsAmountDue';
import { InvoiceItemsTable } from '../InvoiceItemsTable';
import styles from './InvoiceMain.module.css';

export const InvoiceMain = ({
  invoiceId,
  mainInvoiceData,
  clientAddress,
  senderAddress,
  items
}) => {
  const { getDate } = useFormatDate();

  return (
    <div className={`secondary-bg ${styles.invoiceMain}`}>
      <div className={styles.refAndDescription}>
        <h4 className={styles.ref}>
          <span className={styles.refHash}>#</span>
          {mainInvoiceData?.id}
        </h4>

        <p className={`text-faded ${styles.description}`}>
          {mainInvoiceData?.description}
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
          <h3>
            {mainInvoiceData?.createdAt && getDate(mainInvoiceData?.createdAt)}
          </h3>
        </div>

        <div className={styles.paymentDue}>
          <p className='text-faded'>Payment Due</p>
          <h3>
            {mainInvoiceData?.paymentDue &&
              getDate(mainInvoiceData?.paymentDue)}
          </h3>
        </div>
      </div>

      <div className={styles.clientDetails}>
        <p className={`text-faded`}>Bill To</p>
        <h3>{mainInvoiceData?.clientName}</h3>

        <div className={`text-faded-xs ${styles.clientAddress}`}>
          <p>{clientAddress?.street}</p>
          <p>{clientAddress?.city}</p>
          <p>{clientAddress?.postCode}</p>
          <p>{clientAddress?.country}</p>
        </div>
      </div>

      <div className={styles.clientEmail}>
        <p className={`text-faded-xs`}>Sent to</p>
        <h3>{mainInvoiceData?.clientEmail}</h3>
      </div>

      <div className={styles.itemsWrapper}>
        {/* hidden screens smaller than 678px */}

        <InvoiceItemsTable items={items} />

        {/* Hidden screens bigger than 678px */}
        <InvoiceItems items={items} />

        <InvoiceItemsAmountDue amountDue={mainInvoiceData?.total} />
      </div>
    </div>
  );
};
