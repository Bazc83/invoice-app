import styles from '@styles/Filter.module.css';
export const FilterModal = ({ light }) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`${light ? styles.filterModalLight : styles.filterModal}`}
      onClick={handleModalClick}>
      <form className={styles.filterModalForm}>
        <div className={styles.filterModalFormItem}>
          <input type='checkbox' name='draft' />
          <label htmlFor='draft'>Draft</label>
        </div>
        <div className={styles.filterModalFormItem}>
          <input type='checkbox' name='pending' />
          <label htmlFor='pending'>Pending</label>
        </div>
        <div className={styles.filterModalFormItem}>
          <input type='checkbox' name='paid' />
          <label htmlFor='paid'>Paid</label>
        </div>
      </form>
    </div>
  );
};
