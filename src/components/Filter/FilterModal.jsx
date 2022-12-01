import { FilterModalItem } from './FilterModalItem';
import styles from './styles/FilterModal.module.css';

export const FilterModal = () => {


  return (
    <div className={styles.modal} >
      <form className={styles.modalForm}>
        <FilterModalItem checkboxLabel={'draft'} />

        <FilterModalItem checkboxLabel={'pending'} />

        <FilterModalItem checkboxLabel={'paid'} />
      </form>
    </div>
  );
};
