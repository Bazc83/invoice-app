import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { InvoiceFormInput } from '../FormInput';
import styles from './FormItem.module.css';

export const FormItem = ({ item, onItemChange, handleDeleteItem }) => {
  const [formItem, setFormItem] = useState({
    itemId: item?.id,
    name: item?.name,
    quantity: item?.quantity,
    price: item?.price,
    total: item?.total,
  });

  const setItemTotal = (itemPrice, itemQuantity) => {
    setFormItem((prev) => ({ ...prev, total: +itemPrice * +itemQuantity }));
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'price' || e.target.name === 'quantity') {
      setFormItem((prev) => ({ ...prev, [e.target.name]: +e.target.value }));
    } else {
      setFormItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    setItemTotal(formItem.price, formItem.quantity);
  };

  const validatePrice = (e) => {
    if (+e.target.value >= 0.0) {
      setFormItem((prev) => ({ ...prev, price: prev.price }));
    } else if (+e.target.value < 0.0 || e.target.value === undefined) {
      setFormItem((prev) => ({ ...prev, price: 0.0 }));
    }
  };

  const validateQty = (e) => {
    if (+e.target.value >= 1) {
      return setFormItem((prev) => ({ ...prev, quantity: prev.quantity }));
    } else if (+e.target.value < 1 || e.target.value === undefined) {
      setFormItem((prev) => ({ ...prev, quantity: 1 }));
    }
  };

  useEffect(() => {
    setItemTotal(formItem.price, formItem.quantity);
  }, [formItem.price, formItem.quantity]);

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
      />

      <InvoiceFormInput
        type='number'
        itemName='quantity'
        itemLabel='Qty.'
        value={formItem?.quantity}
        maxWidth={'max-content'}
        className={styles.qty}
        setValue={handleInputChange}
        min={1}
        max={100}
        step={1}
        onBlur={validateQty}
      />

      <InvoiceFormInput
        type='number'
        itemName='price'
        itemLabel='Price'
        value={formItem?.price}
        setValue={handleInputChange}
        maxWidth={'max-content'}
        className={styles.price}
        min={0.01}
        step={0.01}
        onBlur={validatePrice}
      />

      <InvoiceFormInput
        type='number'
        itemName='total'
        itemLabel='Total'
        value={formItem.total.toFixed(2)}
        maxWidth={'max-content'}
        className={styles.total}
        disabled
        noBg
      />

      <div
        className={styles.icon}
        onClick={() => handleDeleteItem(item.itemId)}>
        <FaTrashAlt className={styles.trashIcon} />
      </div>
    </div>
  );
};
