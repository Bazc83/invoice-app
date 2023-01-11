import styles from './InvoiceItems.module.css';

export const InvoiceItems = ({ items }) => {
  return (
    <div className={styles.invoiceItems}>
      {items?.map((item, i) => {
        return <InvoiceItem item={item} key={`item${i}`} />;
      })}
    </div>
  );
};

const InvoiceItem = ({ item }) => {
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
