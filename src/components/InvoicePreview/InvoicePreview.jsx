import { useEffect } from 'react';
import styles from './styles/InvoicePreview.module.css';
export const InvoicePreview = (props) => {
  const { invoiceRef, name, dueDate, amount, paymentStatus } = props;

  let paymentStatusStyling;
  if (paymentStatus === 'paid') {
    paymentStatusStyling = styles.paymentStatusPaid;
  } else if (paymentStatus === 'pending') {
    paymentStatusStyling = styles.paymentStatusPending;
  } else if (paymentStatus === 'draft') {
    paymentStatusStyling = styles.paymentStatusDraft;
  }

  return (
    <div className={styles.invoicePreview}>
      <h4 className={styles.invoiceRef}>
        <span className={styles.invoiceRefHash}>#</span>
        {invoiceRef}
      </h4>

      <p className={`text ${styles.dueDate}`}>{dueDate}</p>

      <p className={`text ${styles.name}`}>{name}</p>

      <h3 className={`${styles.amount}`}>£ {amount}</h3>

      <div className={paymentStatusStyling}>
        <div className={styles.customBullet}></div>
        <p>{paymentStatus}</p>
      </div>
    </div>
  );
};
