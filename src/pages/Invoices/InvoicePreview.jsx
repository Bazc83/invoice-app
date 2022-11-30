import styles from './styles/InvoicePreview.module.css';
export const InvoicePreview = (props) => {
  const { invoiceRef, name, dueDate, amount, paymentStatus, light } = props;

  // sets --paymentStatusColor CSS variable/custom property
  let paymentStatusColor;
  if (paymentStatus === 'paid') {
    paymentStatusColor = '#33d69f';
  } else if (paymentStatus === 'pending') {
    paymentStatusColor = '#ff8f00';
  } else if (paymentStatus === 'draft') {
    paymentStatusColor = light ? '#373b53' : '#dfe3fa';
  }

  return (
    <div
      className={styles.invoicePreview}
      style={{ '--invoicePreview-bg': `${light ? '#ffffff' : '#1e2139'}` }}>
      <h4 className={styles.invoiceRef}>
        <span className={styles.invoiceRefHash}>#</span>
        {invoiceRef}
      </h4>

      <p
        className={`${light ? 'faded-text-dark' : 'faded-text-light'} ${
          styles.dueDate
        }`}>
        {dueDate}
      </p>

      <p className={`text ${styles.name}`} style={{color: `${light ?"#858BB2" : "#ffffff"}`}}>{name}</p>

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
