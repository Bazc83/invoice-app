import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { InvoiceFormInput } from '../InvoiceFormInput';
import styles from './InvoiceFormItem.module.css';

export const InvoiceFormItem = ({ item, onItemChange, handleDeleteItem }) => {
  const [formItem, setFormItem] = useState({
    itemId: item?.id,
    name: item?.name,
    quantity: item?.quantity,
    price: item?.price,
    total: item?.total,
  });

  const handleInputChange = (e) => {
    if (e.target.name === 'price' || e.target.name === 'quantity') {
      setFormItem((prev) => ({ ...prev, [e.target.name]: +e.target.value }));
    } else {
      setFormItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    setFormItem((prev) => ({ ...prev, total: +prev.price * +prev.quantity }));
  };

  useEffect(() => {
    setFormItem((prev) => ({ ...prev, itemId: item.itemId }));
  }, [item.itemId, setFormItem]);

  useEffect(() => {
    onItemChange(formItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formItem]);

  return (
    <div className={styles.invoiceFormItem}>
      <InvoiceFormInput
        type='text'
        itemName='name'
        itemLabel='Item Name'
        value={formItem?.name}
        className={styles.name}
        setValue={handleInputChange}
        item
      />

      <InvoiceFormInput
        type='number'
        itemName='quantity'
        itemLabel='Qty.'
        value={formItem?.quantity}
        maxWidth={'max-content'}
        className={styles.qty}
        setValue={handleInputChange}
        item
      />
      <InvoiceFormInput
        type='number'
        itemName='price'
        itemLabel='Price'
        value={formItem?.price}
        setValue={handleInputChange}
        maxWidth={'max-content'}
        className={styles.price}
        item
      />
      <InvoiceFormInput
        type='number'
        itemName='total'
        itemLabel='Total'
        value={formItem.total}
        maxWidth={'max-content'}
        className={styles.total}
        disabled
        noBg
        item
      />

      <div
        className={styles.icon}
        onClick={() => handleDeleteItem(item.itemId)}>
        <FaTrashAlt className={styles.trashIcon} />
      </div>
    </div>
  );
};
