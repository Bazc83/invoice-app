import styles from './InvoiceItemsTable.module.css';
export const InvoiceItemsTable = ({ items }) => {
  return (
    <table className={styles.invoiceItemsTable}>
      <thead>
        <tr className='text-faded-xs'>
          <th>Item Name</th>
          <th>QTY</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item, i) => {
          return (
            <tr key={`tableItem${i}`} className='text'>
              <td>{item?.name}</td>
              <td>{item?.quantity}</td>
              <td>{item?.price}</td>
              <td>
                {new Intl.NumberFormat('en', {
                  style: 'currency',
                  currency: 'GBP',
                }).format(item?.total)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
// item name QTY  Price   Total
