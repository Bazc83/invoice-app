import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { InvoiceFormInput } from '../InvoiceFormInput';
import styles from './InvoiceFormItem.module.css';

export const InvoiceFormItem = ({ item, onItemChange, handleDeleteItem }) => {
  const [itemId] = useState(item?.itemId);
  const [name, setName] = useState(item?.name);
  const [quantity, setQuantity] = useState(item?.quantity);
  const [price, setPrice] = useState(item?.price);
  const [total, setTotal] = useState(item?.total);

  const [formItem, setFormItem] = useState({
    itemId: item?.itemId,
    name: item?.name,
    quantity: item?.quantity,
    price: item?.price,
    total: item?.total,
  });

  useEffect(() => {
    setTotal(+price * +(+quantity));
  }, [price, quantity]);

  useEffect(() => {
    setFormItem({
      itemId: itemId,
      name: name,
      quantity: quantity,
      price: price,
      total: total,
    });
  }, [itemId, name, quantity, price, total]);

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
        value={name || ''}
        className={styles.name}
        setValue={(e) => setName(e.target.value)}
        item
      />

      <InvoiceFormInput
        type='number'
        itemName='quantity'
        itemLabel='Qty.'
        value={quantity || 1}
        maxWidth={'max-content'}
        className={styles.qty}
        setValue={(e) => setQuantity(+e.target.value)}
        item
      />
      <InvoiceFormInput
        type='number'
        itemName='price'
        itemLabel='Price'
        value={price || 0.0}
        setValue={(e) => setPrice(+e.target.value)}
        maxWidth={'max-content'}
        className={styles.price}
        item
      />
      <InvoiceFormInput
        type='number'
        itemName='total'
        itemLabel='Total'
        value={total || 0}
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
