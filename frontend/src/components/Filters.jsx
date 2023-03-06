import { useContext, useEffect } from 'react';

import { InvoicesContext } from '@/context/InvoicesContext';

import FilterItemCheckbox from './FilterItemCheckbox';

function Filters() {
  const { state, dispatch } = useContext(InvoicesContext);

  useEffect(() => dispatch({ type: 'clearFilters' }), [dispatch]);

  return (
    <div className="flex  justify-center  gap-2 sm:gap-2 flex-col  text-sm sm:w-auto   md:items-center md:flex-row md:gap-4">
      <h1>Filters:</h1>

      <form className="flex   flex-wrap gap-2  md:gap-3 md:flex-row">
        {/* Filter modal options */}
        {state.filters.map((filter) => (
          <FilterItemCheckbox filter={filter} key={filter.filterValue} />
        ))}
      </form>
    </div>
  );
}
export default Filters;
