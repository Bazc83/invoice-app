import styles from './styles/InvoicePreview.module.css';
export const InvoicePreview = (props) => {
  const { invoice, light } = props;


const {status, id, clientName, total, paymentDue} = invoice;


  // invoiceRef={'RT3080'}
  // name={invoice.clientName}
  // dueDate={invoice.paymentDue}
  // amount={'1,800.90'}
  // paymentStatus={invoice.status}
  // sets --paymentStatusColor CSS variable/custom property


  let paymentStatusColor;
  if (status === 'paid') {
    paymentStatusColor = '#33d69f';
  } else if (status === 'pending') {
    paymentStatusColor = '#ff8f00';
  } else if (status === 'draft') {
    paymentStatusColor = light ? '#373b53' : '#dfe3fa';
  }

  return (
    <div
      className={styles.invoicePreview}
      style={{ '--invoicePreview-bg': `${light ? '#ffffff' : '#1e2139'}` }}>
      <h4 className={styles.invoiceRef}>
        <span className={styles.invoiceRefHash}>#</span>
        {id}
      </h4>

      <p
        className={`${light ? 'faded-text-dark' : 'faded-text-light'} ${
          styles.dueDate
        }`}>
        {paymentDue}
      </p>

      <p className={`text ${styles.name}`} style={{color: `${light ?"#858BB2" : "#ffffff"}`}}>{clientName}</p>

      <h3 className={`${styles.amount}`}>£ {total}</h3>

      <div
        className={styles.paymentStatus}
        // --paymentStatusColor set from paymentStatusColor variable above
        style={{ '--paymentStatusColor': `${paymentStatusColor}` }}>
        <div className={styles.customBullet}></div>
        <h4>{status}</h4>
      </div>
    </div>
  );
};
