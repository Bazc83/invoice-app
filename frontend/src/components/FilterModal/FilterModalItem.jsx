import { InvoicesContext } from "@/context/InvoicesContext";
import { useContext } from "react";
import { FaCheck } from "react-icons/fa";

export const FilterModalItem = ({ filter }) => {
  const { dispatch } = useContext(InvoicesContext);

  const handleChecked = (e) => {
    dispatch({ type: "setFilters", payload: filter.filterValue });
  };

  return (
    <div
      className={` relative z-40 flex cursor-pointer gap-3 rounded-sm pl-8 after:absolute after:top-0 after:left-0 after:h-5 after:w-5 after:rounded-sm after:bg-gray-400 dark:after:bg-gray-600 `}
      onClick={handleChecked}
    >
      <input
        type="checkbox"
        name={filter.filterValue}
        className="absolute top-0 left-0 opacity-0"
        value={filter.checked}
      />

      {filter.checked && (
        <FaCheck className={`absolute top-[2px] left-[2px] z-50`} />
      )}
      <label htmlFor={filter.filterValue} className="cursor-pointer capitalize">
        {filter.filterValue}
      </label>
    </div>
  );
};
