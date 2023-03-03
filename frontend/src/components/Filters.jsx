import { useContext, useEffect } from 'react';

import { InvoicesContext } from '@/context/InvoicesContext';

import FilterItemCheckbox from './FilterItemCheckbox';

function Filters() {
  const { state, dispatch } = useContext(InvoicesContext);

  useEffect(() => dispatch({ type: 'clearFilters' }), [dispatch]);

  return (
    <div className="flex  gap-4  text-sm font-semibold md:gap-4 flex-col md:flex-row lg:flex-col">
      <h1>Filters:</h1>

      <form className="flex  gap-3  lg:flex-col  ">
        {/* Filter modal options */}
        {state.filters.map((filter) => (
          <FilterItemCheckbox filter={filter} key={filter.filterValue} />
        ))}
      </form>
    </div>
  );
}
export default Filters;
