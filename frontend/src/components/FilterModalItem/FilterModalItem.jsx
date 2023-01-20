import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './FilterModalItem.module.css';

export const FilterModalItem = ({
  checkboxLabel,
  filterChangeHandler,
  filters,
}) => {
  
  const [checked, setChecked] = useState(filters[checkboxLabel]);

  const handleChecked = (e) => {
    setChecked((prev) => !prev);
    filterChangeHandler(checkboxLabel);
  };

  return (
    <div
      className={checked ? styles.modalFormItemChecked : styles.modalFormItem}
      onClick={handleChecked}>
      <input
        type='checkbox'
        name={checkboxLabel}
        className={styles.modalFormCheckbox}
        value={checked}
      />
      {checked && <FaCheck className={styles.modalFormIcon} />}
      <label htmlFor={checkboxLabel} className={styles.modalFormItemLabel}>
        {checkboxLabel}
      </label>
    </div>
  );
};
