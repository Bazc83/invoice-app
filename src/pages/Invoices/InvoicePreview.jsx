import { PaymentStatus } from '@/components/PaymentStatus';
import styles from './styles/InvoicePreview.module.css';
export const InvoicePreview = (props) => {
  const { invoice, light, onClick } = props;

  const { status, id, clientName, total, paymentDue } = invoice;

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

      <PaymentStatus status={status} light={light} className={styles.paymentStatus}/>
    </div>
  );
};
