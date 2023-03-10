import FilterItemCheckbox from './FilterItemCheckbox';

function Filters({ payload, handleChecked }) {
  return (
    <form className="flex  flex-col gap-2 px-8 ">
      {/* Filter modal options */}

      <FilterItemCheckbox
        filter={payload.paid}
        filterValue="paid"
        handleChecked={handleChecked}
      />
      <FilterItemCheckbox
        filter={payload.quote}
        filterValue="quote"
        handleChecked={handleChecked}
      />
      <FilterItemCheckbox
        filterValue="pending"
        filter={payload.pending}
        handleChecked={handleChecked}
      />
    </form>
  );
}
export default Filters;
