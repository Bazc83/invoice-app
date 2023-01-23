import styles from './InvoiceItems.module.css';

export const InvoiceItem = ({ item }) => {
  return (
    <div className={styles.invoiceItem}>
      <div>
        <h4>{item?.name}</h4>

        <p className={`text ${styles.quantityXPrice}`}>
          {item?.quantity} x{' '}
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'GBP',
          }).format(item?.price)}
        </p>
      </div>
      <h4>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.total)}
      </h4>
    </div>
  );
};
