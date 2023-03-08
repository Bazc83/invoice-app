import { FaCheck } from 'react-icons/fa';

function FilterItemCheckbox({ filter, filterValue, handleChecked }) {


  return (
    <div
      className={` relative z-20 flex cursor-pointer  rounded-sm pl-7 after:absolute after:top-0 after:left-0 after:h-5 after:w-5 after:rounded-sm after:bg-skin-fill`}
      onClick={() => handleChecked(filterValue)}
      aria-hidden="true"
    >
      <input
        type="checkbox"
        name={filterValue}
        className="absolute top-0 left-0 opacity-0"
        value={filter}
      />

      {filter && (
        <FaCheck className="absolute top-[2px] left-[2px] z-30 " />
      )}
      <label
        htmlFor={filterValue}
        className="cursor-pointer capitalize "
      >
        {filterValue}
      </label>
    </div>
  );
}

export default FilterItemCheckbox;
