import { useState } from 'react';
import styles from './InvoiceFormSelect.module.css';

export const InvoiceFormSelect = () => {
  const [showOptions, setShowOptions] = useState(true);
  const [selectValue, setSelectValue] = useState("Net 30 Days");
  return (
    <div className={styles.invoiceFormSelect}>
      <label htmlFor='paymentTerms'>Payment Terms</label>
      <select
        name='paymentTerms'
        onClick={() => setShowOptions((prev) => !prev)}></select>

      {showOptions && (
        <div className={styles.customDropdown}>
          <option value='1'>Net 1 Day</option>
          <option value='7'>Net 7 Days</option>
          <option value='14'>Net 14 Days</option>
          <option value='30'>Net 30 Days</option>
        </div>
      )}
    </div>
  );
};
