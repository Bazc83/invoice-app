import styles from './styles/InvoiceItem.module.css';
export const InvoiceItem = ({ item }) => {
  return (
    <div className={styles.invoiceItem}>
      <div>
        <h4>{item?.name}</h4>

        <p className={`text ${styles.quantityXPrice}`}>
          {item?.quantity} x £{item?.price}
        </p>
      </div>
      <h4>£ {item?.total}</h4>
    </div>
  );
};
