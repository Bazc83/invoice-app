import { FilterModalItem } from './FilterModalItem';
import styles from './styles/FilterModal.module.css';

export const FilterModal = ({ light }) => {
  const filterModalColor = light ? '#ffffff' : '#252945';
  const filterModalShadow = light
    ? '0px 10px 20px 0px #48549f40'
    : '0px 10px 20px 0px #00000040';

  const filterModalStyles = {
    '--filterModal-color': `${filterModalColor}`,
    '--filterModal-shadow': `${filterModalShadow}`,
  };
  return (
    <div className={styles.modal} style={filterModalStyles}>
      <form className={styles.modalForm}>
        <FilterModalItem checkboxLabel={'draft'} light={light} />

        <FilterModalItem checkboxLabel={'pending'} light={light} />

        <FilterModalItem checkboxLabel={'paid'} light={light} />
      </form>
    </div>
  );
};
