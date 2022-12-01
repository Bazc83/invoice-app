import styles from './styles/InvoiceItem.module.css';
export const InvoiceItem = ({ item }) => {
  return (
    <div>
      <h2>{item?.name}</h2>

      <p className='text'>
        {item?.quantity} x £{item?.price}
      </p>

      <h2>£ {item?.total}</h2>
    </div>
  );
};
