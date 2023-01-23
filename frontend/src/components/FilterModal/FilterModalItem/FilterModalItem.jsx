import { InvoicesContext } from '@/context/InvoicesContext';
import { useContext } from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './FilterModalItem.module.css';

export const FilterModalItem = ({ filter }) => {
  const { dispatch } = useContext(InvoicesContext);

  const handleChecked = (e) => {
    dispatch({ type: 'setFilters', payload: filter.filterValue });
  };

  return (
    <div
      className={
        filter.checked ? styles.modalFormItemChecked : styles.modalFormItem
      }
      onClick={handleChecked}>
      <input
        type='checkbox'
        name={filter.filterValue}
        className={styles.modalFormCheckbox}
        value={filter.checked}
      />
      {filter.checked && <FaCheck className={styles.modalFormIcon} />}
      <label htmlFor={filter.filterValue} className={styles.modalFormItemLabel}>
        {filter.filterValue}
      </label>
    </div>
  );
};
