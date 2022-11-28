import styles from '@styles/Filter.module.css';
export const FilterModal = ({ light }) => {
  console.log(light);
  return (
    <div className={`${light ? styles.filterModalLight : styles.filterModal}`}>
      FilterModal
    </div>
  );
};
