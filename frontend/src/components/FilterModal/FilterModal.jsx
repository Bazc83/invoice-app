import { useContext } from 'react';

import { FilterModalItem } from '@/components/FilterModal/FilterModalItem';
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
    <div className={`relative  w-full sm:w-auto ${filterModal && 'z-30'}`}>
      {/* Show/Hide modal button */}
      <button
        type="button"
        disabled={state.filteredInvoices?.length === 0}
        className={`flex w-full items-center  justify-center gap-2 rounded-md px-4 py-2 text-sm sm:w-auto lg:text-base ${
          state.filteredInvoices?.length === 0
            ? 'secondary-bg text-gray-50 dark:text-gray-800 '
            : ' bg-gray-700   text-gray-50 '
        }`}
        onClick={handleShowModal}
      >
        {filterModal ? 'Hide Filters' : 'Show Filters'}
      </button>

      {filterModal && (
        <div className="secondary-bg absolute top-11 -left-3 rounded-md p-6 ">
          <form className="flex flex-col gap-4">
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
