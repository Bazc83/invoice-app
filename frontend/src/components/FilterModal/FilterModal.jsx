import { FilterModalItem } from '@/components/FilterModal/FilterModalItem';
import { InvoicesContext } from '@/context/InvoicesContext';
import { PageLayoutContext } from '@/pages/PageLayout';
import { useContext } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './FilterModal.module.css';

export const FilterModal = () => {
  const { state } = useContext(InvoicesContext);
  const { showModal, setShowModal } = useContext(PageLayoutContext);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filter} onClick={handleShowModal}>
        <h4>Filter</h4>
        {showModal ? (
          <FaChevronDown className={styles.filterIcon} />
        ) : (
          <FaChevronUp className={styles.filterIcon} />
        )}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <form className={styles.modalForm}>
            {/* Filter modal options */}
            {state.filters.map((filter) => (
              <FilterModalItem filter={filter} key={filter.filterValue} />
            ))}
          </form>
        </div>
      )}
    </div>
  );
};
