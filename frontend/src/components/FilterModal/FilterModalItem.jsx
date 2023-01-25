import { InvoicesContext } from '@/context/InvoicesContext';
import { useContext } from 'react';
import { FaCheck } from 'react-icons/fa';

export const FilterModalItem = ({ filter }) => {
  const { dispatch } = useContext(InvoicesContext);

  const handleChecked = (e) => {
    dispatch({ type: 'setFilters', payload: filter.filterValue });
  };

  return (
    <div
      className={` flex gap-3 relative pl-8 cursor-pointer after:absolute after:top-0 after:left-0 after:h-5 after:w-5 rounded-sm z-40 dark:after:bg-gray-800 after:bg-gray-400 after:rounded-sm `}
      onClick={handleChecked}>
      <input
        type='checkbox'
        name={filter.filterValue}
        className='absolute opacity-0 top-0 left-0'
        value={filter.checked}
      />

      {filter.checked && (
        <FaCheck className={`absolute top-[2px] left-[2px] z-50`} />
      )}
      <label htmlFor={filter.filterValue} className='cursor-pointer capitalize'>
        {filter.filterValue}
      </label>
    </div>
  );
};
