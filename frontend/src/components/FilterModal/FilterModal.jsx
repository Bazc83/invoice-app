import { FilterModalItem } from "@/components/FilterModal/FilterModalItem";
import { InvoicesContext } from "@/context/InvoicesContext";
import { PageLayoutContext } from "@/pages/PageLayout";
import { useContext } from "react";

export const FilterModal = () => {
  const { state } = useContext(InvoicesContext);
  const { showModal, setShowModal } = useContext(PageLayoutContext);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="relative z-40">
      {/* Show/Hide modal button */}
      <button
        disabled={state.filteredInvoices?.length === 0}
        className={`flex items-center justify-center  gap-2 rounded-md px-4 py-2 text-sm lg:text-base ${
          state.filteredInvoices?.length === 0
            ? "secondary-bg text-gray-50 dark:text-gray-800 "
            : " bg-gray-700   text-gray-50 "
        }`}
        onClick={handleShowModal}
      >
        {showModal ? "Hide Filters" : "Show Filters"}
      </button>

      {showModal && (
        <div className="secondary-bg absolute top-11 -left-3 rounded-md p-6">
          <form className="flex flex-col gap-4">
            {/* Filter modal options */}
            {state.filters.map((filter) => (
              <FilterModalItem filter={filter} key={filter.filterValue} />
            ))}
          </form>
        </div>
      )}
    </div>
  );
};
