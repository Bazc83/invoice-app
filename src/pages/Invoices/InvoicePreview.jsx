import styles from './styles/InvoicePreview.module.css';
export const InvoicePreview = (props) => {
  const { invoiceRef, name, dueDate, amount, paymentStatus } = props;

  // sets --paymentStatusColor CSS variable/custom property
  let paymentStatusColor;
  if (paymentStatus === 'paid') {
    paymentStatusColor = '#33d69f';
  } else if (paymentStatus === 'pending') {
    paymentStatusColor = '#ff8f00';
  } else if (paymentStatus === 'draft') {
    paymentStatusColor = '#dfe3fa';
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

      <div
        className={styles.paymentStatus}
        // --paymentStatusColor set from paymentStatusColor variable above
        style={{ '--paymentStatusColor': `${paymentStatusColor}` }}>
        <div className={styles.customBullet}></div>
        <h4>{paymentStatus}</h4>
      </div>
    </div>
  );
};
