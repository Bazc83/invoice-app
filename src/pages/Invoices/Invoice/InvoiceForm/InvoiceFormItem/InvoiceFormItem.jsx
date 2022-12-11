import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { InvoiceFormInput } from '../InvoiceFormInput';
import styles from './InvoiceFormItem.module.css';

export const InvoiceFormItem = ({ item }) => {
  const [total, setTotal] = useState(0);

  if (!item?.price) return null;

  const totalItemValue = (price, qty) => {
    setTotal((prev) => (prev = qty * price));
  };

  useEffect(() => {
    totalItemValue(item.price, item.quantity);
  }, [item]);

  return (
    <div className={styles.invoiceFormItem}>
      <InvoiceFormInput
        type='text'
        itemName='itemName'
        itemLabel='Item Name'
        inputValue={item?.name}
        className={styles.name}
      />

      <InvoiceFormInput
        type='number'
        itemName='itemQty'
        itemLabel='Qty.'
        inputValue={item?.quantity}
        maxWidth={'max-content'}
        className={styles.qty}
      />
      <InvoiceFormInput
        type='number'
        itemName='itemPrice'
        itemLabel='Price'
        inputValue={item?.price.toFixed(2)}
        maxWidth={'max-content'}
        className={styles.price}
      />
      <InvoiceFormInput
        type='number'
        itemName='itemTotal'
        itemLabel='Total'
        inputValue={total.toFixed(2)}
        maxWidth={'max-content'}
        className={styles.total}
        disabled
        noBg
      />

      <div className={styles.icon}>
        <FaTrashAlt className={styles.trashIcon} />
      </div>
    </div>
  );
};
