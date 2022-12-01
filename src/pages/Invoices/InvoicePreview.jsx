import { PaymentStatus } from '@/components/PaymentStatus';
import styles from './styles/InvoicePreview.module.css';
export const InvoicePreview = (props) => {
  const { invoice, onClick } = props;

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
    <div onClick={onClick} className={`secondary-bg ${styles.invoicePreview}`}>
      <h4 className={styles.invoiceRef}>
        <span className={styles.invoiceRefHash}>#</span>
        {id}
      </h4>

      <p className={`${styles.dueDate}`}>{dueDate}</p>

      <p className={`text ${styles.name}`}>{clientName}</p>

      <h3 className={`${styles.amount}`}>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(total)}
      </h3>

      <PaymentStatus status={status} className={styles.paymentStatus} />
    </div>
  );
};
