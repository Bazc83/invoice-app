import { useContext } from 'react';
import { FaCheck } from 'react-icons/fa';

import { InvoicesContext } from '@/context/InvoicesContext';

function FilterItemCheckbox({ filter }) {
  const { dispatch } = useContext(InvoicesContext);

  const handleChecked = () => {
    dispatch({ type: 'setFilters', payload: filter.filterValue });
  };

  return (
    <div
      className={` relative z-20 flex cursor-pointer  rounded-sm pl-7 after:absolute after:top-0 after:left-0 after:h-5 after:w-5 after:rounded-sm after:bg-skin-fill`}
      onClick={handleChecked}
      aria-hidden="true"
    >
      <input
        type="checkbox"
        name={filter.filterValue}
        className="absolute top-0 left-0 opacity-0"
        value={filter.checked}
      />

      {filter.checked && (
        <FaCheck className="absolute top-[2px] left-[2px] z-30 " />
      )}
      <label
        htmlFor={filter.filterValue}
        className="cursor-pointer capitalize "
      >
        {filter.filterValue}
      </label>
    </div>
  );
}

export default FilterItemCheckbox;
