import { useState } from 'react';
import styles from './InvoiceFormItem.module.css';
export const InvoiceFormItem = ({ type, itemName, itemLabel, inputError }) => {
  const [itemValue, setItemValue] = useState('');
  
  return (
    <div className={`${styles.invoiceFormItem} ${inputError && styles.inputError}`} >
      <label htmlFor={itemName} className='text-faded'>
        {itemLabel}
      </label>
      <input
        type={type ? type : 'text'}
        name={itemName}
        className={`text`}
        value={itemValue}
        onChange={(e) => setItemValue(e.target.value)}
      />
    </div>
  );
};
