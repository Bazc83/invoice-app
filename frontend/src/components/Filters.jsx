import FilterItemCheckbox from './FilterItemCheckbox';

function Filters({ payload, handleChecked }) {
  return (
    <div className="flex  flex-col  justify-center gap-2 text-sm  sm:w-auto sm:gap-2   md:flex-row md:items-center md:gap-4">
      <h1>Filters:</h1>

      <form className="flex   flex-wrap gap-2  md:flex-row md:gap-3">
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
    </div>
  );
}
export default Filters;
