import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './styles/FilterModalItem.module.css';

export const FilterModalItem = ({ checkboxLabel, light }) => {
  const [checked, setChecked] = useState(false);

  if (light) {
    return (
      <div
        className={
          checked ? styles.modalFormItemCheckedLight : styles.modalFormItemLight
        }
        onClick={() => setChecked((prev) => !prev)}>
        <input
          type='checkbox'
          name={checkboxLabel}
          className={styles.modalFormCheckboxLight}
          value={checked}
        />
        {checked && <FaCheck className={styles.modalFormIconLight} />}
        <label htmlFor={checkboxLabel} className={styles.modalFormItemLabel}>
          {checkboxLabel}
        </label>
      </div>
    );
  }

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
