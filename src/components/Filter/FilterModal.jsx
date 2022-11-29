import { FilterModalItem } from './FilterModalItem';
import styles from './styles/FilterModal.module.css';

export const FilterModal = ({ light }) => {
  return (
    <div className={`${light ? styles.modalLight : styles.modal}`}>
      <form className={styles.modalForm}>
        <FilterModalItem checkboxLabel={'draft'} light={light} />

        <FilterModalItem checkboxLabel={'pending'} light={light} />

        <FilterModalItem checkboxLabel={'paid'} light={light} />
      </form>
    </div>
  );
};
