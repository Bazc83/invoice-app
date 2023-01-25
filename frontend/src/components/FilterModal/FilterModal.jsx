import { FilterModalItem } from '@/components/FilterModal/FilterModalItem';
import { InvoicesContext } from '@/context/InvoicesContext';
import { PageLayoutContext } from '@/pages/PageLayout';
import { useContext } from 'react';

export const FilterModal = () => {
  const { state } = useContext(InvoicesContext);
  const { showModal, setShowModal } = useContext(PageLayoutContext);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className='relative z-40'>
      {/* Show/Hide modal button */}
      <button
        className='flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-md text-xs text-gray-50'
        onClick={handleShowModal}>
        {showModal ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showModal && (
        <div className='absolute top-10 -left-7 p-6 secondary-bg rounded-md'>
          <form className='flex flex-col gap-4'>
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
