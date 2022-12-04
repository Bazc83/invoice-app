import styles from './InvoiceItemsTable.module.css';
export const InvoiceItemsTable = ({ items }) => {
  return (
    <table className={styles.invoiceItemsTable}>
      <tr  className='text-faded-xs'>
        <th>Item Name</th>
        <th>QTY</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
      {items?.map((item, i) => {
        return (
          <tr key={`tableItem${i}`} className="text">
            <td >{item?.name}</td>
            <td>{item?.quantity}</td>
            <td>{item?.price}</td>
            <td>{item?.total}</td>
          </tr>
        );
      })}
    </table>
  );
};
// item name QTY  Price   Total
