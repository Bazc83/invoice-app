export const InvoiceTableItem = ({ item }) => {
  return (
    <tr className='text'>
      <td>{item?.name}</td>
      <td>{item?.quantity}</td>
      <td>
        {' '}
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.price)}
      </td>
      <td>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.total)}
      </td>
    </tr>
  );
};
