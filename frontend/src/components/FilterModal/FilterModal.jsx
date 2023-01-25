import { FilterModalItem } from '@/components/FilterModal/FilterModalItem';
import { InvoicesContext } from '@/context/InvoicesContext';
import { PageLayoutContext } from '@/pages/PageLayout';
import { useContext } from 'react';
import styles from './FilterModal.module.css';

export const FilterModal = () => {
  const { state } = useContext(InvoicesContext);
  const { showModal, setShowModal } = useContext(PageLayoutContext);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className='relative'>
      <div
        className='flex gap-3 cursor-pointer relative items-baseline'
        onClick={handleShowModal}>
        <button className='flex items-center gap-2 dark:bg-gray-800 px-4 py-2 rounded-md text-xs text-gray-50'>
          {showModal ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showModal && (
        <div className='absolute top-9 -left-9 p-6 secondary-bg'>
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
