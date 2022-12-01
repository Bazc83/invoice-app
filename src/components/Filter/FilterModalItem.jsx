import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './styles/FilterModalItem.module.css';

export const FilterModalItem = ({ checkboxLabel }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={checked ? styles.modalFormItemChecked : styles.modalFormItem}
      onClick={() => setChecked((prev) => !prev)}>
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
