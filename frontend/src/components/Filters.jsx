import { useContext } from 'react';

import { InvoicesContext } from '@/context/InvoicesContext';

import FilterItemCheckbox from './FilterItemCheckbox';

function Filters() {
  const { state } = useContext(InvoicesContext);

  return (
    <div className="flex flex-col gap-3 px-2 md:flex-row md:gap-6 lg:flex-col">
      <h1>Filters:</h1>

      <form className="flex flex-row gap-4 lg:flex-col flex-wrap">
        {/* Filter modal options */}
        {state.filters.map((filter) => (
          <FilterItemCheckbox filter={filter} key={filter.filterValue} />
        ))}
      </form>
    </div>
  );
}
export default Filters;
