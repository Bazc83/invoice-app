import { FilterModalItem } from '../FilterModalItem/FilterModalItem';
import styles from './FilterModal.module.css';

export const FilterModal = () => {
  return (
    <div className={styles.modal}>
      <form className={styles.modalForm}>
        <FilterModalItem checkboxLabel={'draft'} />

        <FilterModalItem checkboxLabel={'pending'} />

        <FilterModalItem checkboxLabel={'paid'} />
      </form>
    </div>
  );
};
