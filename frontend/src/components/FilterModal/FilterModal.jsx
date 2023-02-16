import { useContext } from 'react';

import { FilterModalItem } from '@/components/FilterItemCheckbox';
import { InvoicesContext } from '@/context/InvoicesContext';
import useModalStore from '@/context/useModalStore';

export function FilterModal() {
  const toggleFilterModal = useModalStore((state) => state.toggleFilterModal);
  const filterModal = useModalStore((state) => state.filterModal);

  const { state } = useContext(InvoicesContext);

  const handleShowModal = () => {
    toggleFilterModal();
  };

  return (
    <div className={`relative  w-full md:w-auto ${filterModal && 'z-30'}`}>
      {/* Show/Hide modal button */}
      <button
        type="button"
        className="primary-bg flex w-full  items-center justify-center gap-2 rounded-md px-4 py-2 text-sm md:w-auto lg:text-base"
        onClick={handleShowModal}
      >
        {filterModal ? 'Hide Filters' : 'Show Filters'}
      </button>

      {filterModal && (
        <div className="secondary-bg absolute top-11 -left-3 rounded-md p-6 ">
          <form className="flex flex-row gap-4">
            {/* Filter modal options */}
            {state.filters.map((filter) => (
              <FilterModalItem filter={filter} key={filter.filterValue} />
            ))}
          </form>
        </div>
      )}
    </div>
  );
}
export default FilterModal;
