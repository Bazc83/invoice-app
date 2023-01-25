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
        className="flex items-center justify-center  gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm text-gray-50 lg:text-base"
        onClick={handleShowModal}
      >
        {showModal ? "Hide Filters" : "Show Filters"}
      </button>

      {showModal && (
        <div className="secondary-bg absolute top-10 -left-7 rounded-md p-6">
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
