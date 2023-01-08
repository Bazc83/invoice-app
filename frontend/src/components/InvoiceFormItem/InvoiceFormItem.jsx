import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { InvoiceFormInput } from '../InvoiceFormInput';
import styles from './InvoiceFormItem.module.css';

export const InvoiceFormItem = ({ item, onItemChange }) => {
  const [formItem, setFormItem] = useState({
    itemId: item?.itemId,
    name: item?.name,
    quantity: +item?.quantity,
    price: +item?.price,
    total: +item?.total,
  });

  const { itemId, name, quantity, price, total } = formItem;

  useEffect(() => {
    setFormItem((prev) => ({ ...prev, itemId: itemId }));
  }, []);

  const handleNameChange = (e) => {
    setFormItem((prev) => ({ ...prev, name: e.target.value }));
  };
  const handleQuantityChange = (e) => {
    setFormItem((prev) => ({ ...prev, quantity: +e.target.value }));
  };
  const handlePriceChange = (e) => {
    setFormItem((prev) => ({ ...prev, price: +e.target.value }));
  };

  useEffect(() => {
    onItemChange(formItem);
  }, [formItem]);

  return (
    <div className={styles.invoiceFormItem}>
      <InvoiceFormInput
        type='text'
        itemName='name'
        itemLabel='Item Name'
        value={name}
        className={styles.name}
        setValue={handleNameChange}
        item
      />

      <InvoiceFormInput
        type='number'
        itemName='quantity'
        itemLabel='Qty.'
        value={+quantity}
        maxWidth={'max-content'}
        className={styles.qty}
        setValue={handleQuantityChange}
        item
      />
      <InvoiceFormInput
        type='number'
        itemName='price'
        itemLabel='Price'
        value={+price}
        setValue={handlePriceChange}
        maxWidth={'max-content'}
        className={styles.price}
        item
      />
      <InvoiceFormInput
        type='number'
        itemName='total'
        itemLabel='Total'
        value={total}
        maxWidth={'max-content'}
        className={styles.total}
        disabled
        noBg
        item
      />

      <div className={styles.icon}>
        <FaTrashAlt className={styles.trashIcon} />
      </div>
    </div>
  );
};
