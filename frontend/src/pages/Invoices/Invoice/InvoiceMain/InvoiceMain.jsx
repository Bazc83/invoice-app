import { InvoicesContext } from '@/App';
import { useFormatDate } from '@/hooks/useFormatDate';
import { useContext } from 'react';
import { InvoiceContext } from '../Invoice';
import { InvoiceItems } from '../InvoiceItems';
import { InvoiceItemsAmountDue } from '../InvoiceItemsAmountDue';
import { InvoiceItemsTable } from '../InvoiceItemsTable';
import styles from './InvoiceMain.module.css';
export const InvoiceMain = () => {
  const { getDate } = useFormatDate();

  const { senderAddress } = useContext(InvoicesContext);

  const {
    invoiceDescription,
    id,
    clientName,
    clientEmail,
    clientStreet,
    clientCity,
    clientCountry,
    clientPostCode,
    invoiceCreatedAt,
    selectedOption,
    invoiceItems,
    invoiceTotal,
    invoicePaymentDue,
  } = useContext(InvoiceContext);

  return (
    <div className={`secondary-bg ${styles.invoiceMain}`}>
      <div className={styles.refAndDescription}>
        <h4 className={styles.ref}>
          <span className={styles.refHash}>#</span>
          {id}
        </h4>

        <p className={`text-faded ${styles.description}`}>
          {invoiceDescription}
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
          <h3>{invoiceCreatedAt && getDate(invoiceCreatedAt)}</h3>
        </div>

        <div className={styles.paymentDue}>
          <p className='text-faded'>Payment Due</p>
          <h3>{invoicePaymentDue && getDate(invoicePaymentDue)}</h3>
        </div>
      </div>

      <div className={styles.clientDetails}>
        <p className={`text-faded`}>Bill To</p>
        <h3>{clientName}</h3>

        <div className={`text-faded-xs ${styles.clientAddress}`}>
          <p>{clientStreet}</p>
          <p>{clientCity}</p>
          <p>{clientPostCode}</p>
          <p>{clientCountry}</p>
        </div>
      </div>

      <div className={styles.clientEmail}>
        <p className={`text-faded-xs`}>Sent to</p>
        <h3>{clientEmail}</h3>
      </div>

      <div className={styles.itemsWrapper}>
        {/* hidden screens smaller than 678px */}

        <InvoiceItemsTable items={invoiceItems} />

        {/* Hidden screens bigger than 678px */}
        <InvoiceItems items={invoiceItems} />

        <InvoiceItemsAmountDue amountDue={invoiceTotal} />
      </div>
    </div>
  );
};
