import styles from './InvoiceItemsAmountDue.module.css';
export const InvoiceItemsAmountDue = ({ amountDue}) => {
  return (
    <div className={styles.amountDue}>
      <p className='text-xs'>Amount Due</p>
      <h2>
        {' '}
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(amountDue)}
      </h2>
    </div>
  );
};
