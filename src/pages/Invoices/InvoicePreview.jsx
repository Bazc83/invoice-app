import styles from './styles/InvoicePreview.module.css';
export const InvoicePreview = (props) => {
  const { invoice, light, onClick } = props;

  const { status, id, clientName, total, paymentDue } = invoice;

  let paymentStatusColor;
  if (status === 'paid') {
    paymentStatusColor = '#33d69f';
  } else if (status === 'pending') {
    paymentStatusColor = '#ff8f00';
  } else if (status === 'draft') {
    paymentStatusColor = light ? '#373b53' : '#dfe3fa';
  }
  const monthsOfTheYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const splitDate = paymentDue.split('-');

  const year = splitDate[0];
  const month = monthsOfTheYear[+splitDate[1]];
  const day = splitDate[2];

  const dueDate = `Due ${day} ${month} ${year}`;
  return (
    <div
      onClick={onClick}
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
        {dueDate}
      </p>

      <p
        className={`text ${styles.name}`}
        style={{ color: `${light ? '#858BB2' : '#ffffff'}` }}>
        {clientName}
      </p>

      <h3 className={`${styles.amount}`}>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(total)}
      </h3>

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
