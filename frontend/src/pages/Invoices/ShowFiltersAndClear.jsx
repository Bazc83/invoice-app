import { useContext } from 'react';
import { FaMinus } from 'react-icons/fa';

import { InvoicesContext } from '@/context/InvoicesContext';

export function ShowFiltersAndClear() {
 
  const { state, dispatch } = useContext(InvoicesContext);

  // Clear all Filters
  const handleClearAllFilters = () => {
    dispatch({ type: 'clearFilters' });
  };

  // Clear filter by value
  const handleClearFilterValue = (filterVal) => {
    dispatch({ type: 'setFilters', payload: filterVal });
  };

  return (
    <div className="secondary-bg   flex flex-col items-center justify-between gap-2 rounded-md px-8 py-2 md:flex-row ">
      <p className="secondary-text text-sm">Active filters:</p>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 ">
        {state.checkedFilters?.map((val) => (
          <button
            type="button"
            key={val}
            onClick={() => handleClearFilterValue(val)}
            className="secondary-text flex cursor-pointer items-center justify-center gap-2 rounded-md border border-red-900  px-2 py-1 text-xs capitalize text-red-900  transition-colors hover:bg-red-900 hover:text-white dark:border-gray-400 dark:text-gray-400 dark:hover:border-red-900 dark:hover:bg-red-900 dark:hover:text-gray-50"
          >
            {val} <FaMinus />
          </button>
        ))}
        {/* Clear filters button */}
        <button
          type="button"
          onClick={handleClearAllFilters}
          className="secondary-text flex cursor-pointer items-center justify-center gap-2 rounded-md border border-red-900  px-2 py-1 text-xs capitalize text-red-900  transition-colors hover:bg-red-900 hover:text-white dark:border-gray-400 dark:text-gray-400 dark:hover:border-red-900 dark:hover:bg-red-900 dark:hover:text-gray-50"
        >
          Clear All
          <FaMinus />
        </button>
      </div>
    </div>
  );
}

export default ShowFiltersAndClear;
