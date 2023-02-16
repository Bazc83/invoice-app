import { useContext } from 'react';

import { FilterModalItem } from '@/components/FilterModal/FilterModalItem';
import { InvoicesContext } from '@/context/InvoicesContext';

function InvoiceFilters() {
  const { state } = useContext(InvoicesContext);

  return (
    <div className="flex flex-col gap-3 px-2">
      <h1>Filters:</h1>

      <form className="flex flex-row gap-4 md:flex-col">
        {/* Filter modal options */}
        {state.filters.map((filter) => (
          <FilterModalItem filter={filter} key={filter.filterValue} />
        ))}
      </form>
    </div>
  );
}
export default InvoiceFilters;
