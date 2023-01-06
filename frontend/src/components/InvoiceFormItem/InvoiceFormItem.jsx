import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { InvoiceFormInput } from '../InvoiceFormInput';
import styles from './InvoiceFormItem.module.css';
export const InvoiceFormItem = ({ item, updateFormItem }) => {
  const [formItem, setFormItem] = useState({
    itemId: item?.itemId,
    name: item?.name,
    quantity: +item?.quantity,
    price: +item?.price,
    total: +item?.total,
  });

  const { itemId, name, quantity, price, total } = formItem;

  const onFormItemChange = (e) => {
    setFormItem((prev) => ({ ...prev, itemId: itemId }));
    if (
      e.target.name === 'quantity' ||
      e.target.name === 'price' ||
      e.target.name === 'total'
    ) {
      setFormItem((prev) => ({
        ...prev,
        [e.target.name]: +e.target.value,
      }));
    } else {
      setFormItem((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    setFormItem((prev) => ({ ...prev, itemId: itemId }));
  }, [itemId]);

  useEffect(() => {
    setFormItem((prev) => ({ ...prev, total: +quantity * +price }));
  }, [price, quantity]);

  useEffect(() => {
    updateFormItem(formItem);
  }, [formItem]);

  return (
    <div className={styles.invoiceFormItem}>
      <InvoiceFormInput
        type='text'
        itemName='name'
        itemLabel='Item Name'
        value={name}
        setValue={onFormItemChange}
        className={styles.name}
        item
      />

      <InvoiceFormInput
        type='number'
        itemName='quantity'
        itemLabel='Qty.'
        value={+quantity}
        setValue={onFormItemChange}
        maxWidth={'max-content'}
        className={styles.qty}
        item
      />
      <InvoiceFormInput
        type='number'
        itemName='price'
        itemLabel='Price'
        value={+price}
        setValue={onFormItemChange}
        maxWidth={'max-content'}
        className={styles.price}
        item
      />
      <InvoiceFormInput
        type='number'
        itemName='total'
        itemLabel='Total'
        value={total}
        setValue={onFormItemChange}
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
