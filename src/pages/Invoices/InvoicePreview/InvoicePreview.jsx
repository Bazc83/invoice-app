import { useFormatDate } from '@/hooks/useFormatDate';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
import styles from './InvoicePreview.module.css';
export const InvoicePreview = (props) => {
  const { invoice, onClick } = props;

  const { status, id, clientName, total, paymentDue } = invoice;

  const { getDate } = useFormatDate();

  return (
    <div onClick={onClick} className={`secondary-bg ${styles.invoicePreview}`}>
      <h4 className={styles.invoiceRef}>
        <span className={styles.invoiceRefHash}>#</span>
        {id}
      </h4>

      <p className={`text-faded ${styles.dueDate}`}>{getDate(paymentDue)}</p>

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
