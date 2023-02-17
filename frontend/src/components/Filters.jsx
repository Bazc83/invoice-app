import { useContext } from 'react';

import { InvoicesContext } from '@/context/InvoicesContext';

import FilterItemCheckbox from './FilterItemCheckbox';

function Filters() {
  const { state } = useContext(InvoicesContext);

  return (
    <div className="flex  gap-3 px-2  md:gap-6 lg:flex-col text-sm">
      <h1>Filters:</h1>

      <form className="flex gap-3 lg:flex-col flex-wrap">
        {/* Filter modal options */}
        {state.filters.map((filter) => (
          <FilterItemCheckbox filter={filter} key={filter.filterValue} />
        ))}
      </form>
    </div>
  );
}
export default Filters;
