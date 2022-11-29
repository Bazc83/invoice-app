import styles from './styles/InvoicePreview.module.css';
export const InvoicePreview = (props) => {
  const { invoiceRef, name, dueDate, amount, paymentStatus } = props;
  return (
    <div className={styles.invoicePreview}>

      <h4 className={styles.invoiceRef}>
        <span className={styles.invoiceRefHash}>#</span>
        {invoiceRef}
      </h4>

      <p className={`text ${styles.dueDate}`}>{dueDate}</p>

      <p className={`text ${styles.name}`}>{name}</p>

      <h3 className={`${styles.amount}`}>£ {amount}</h3>

      <div className={styles.paymentStatusPaid}>
        <div className={styles.customBulletPaid}></div>
        <p className={styles.paymentStatusTextPaid}>Paid</p>
      </div>
    </div>
  );
};


