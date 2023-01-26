import { FilterModal } from "@/components/FilterModal";
import { NewInvoiceForm } from "@/components/NewInvoiceForm";
import { NoInvoices } from "@/components/NoInvoices";
import { InvoicesContext } from "@/context/InvoicesContext";
import { useInvoices } from "@/hooks/reactQueryHooks/useInvoices";
import { InvoicePreview } from "@/pages/Invoices/InvoicePreview";
import { useContext, useEffect } from "react";
import { ShowFiltersAndClear } from "./ShowFiltersAndClear";

export const Invoices = () => {
  const { state, dispatch } = useContext(InvoicesContext);

  const { isLoading, isError, error, data: invoices } = useInvoices();

  useEffect(() => {
    dispatch({ type: "filterInvoices", payload: invoices });
  }, [invoices, dispatch, state.filters]);

  if (isLoading) return "Loading...";
  if (isError) return "An error has occurred: " + error.message;
  return (
    <div className="primary-bg flex flex-col px-6  md:px-8 ">
      <div className="secondary-bg mt-6 mb-2  flex items-center justify-between rounded-md px-8 py-4 lg:mb-2">
        {/* Button shows new invoice form */}
        <button
          className="flex items-center gap-2 rounded-md bg-green-900 px-4 py-2 text-sm text-gray-50 lg:text-base"
          onClick={() => dispatch({ type: "toggleInvoiceForm" })}
        >
          Add Invoice
        </button>

        {/* FilterModal invoices compontent */}
        <FilterModal />
      </div>

      {/* Shows current filters and a button to clear all filters*/}
      {state.checkedFilters?.length > 0 && <ShowFiltersAndClear />}

      {/* Add new invoice */}
      {state.showInvoiceForm && <NewInvoiceForm />}

      {/* No invoice component */}
      {state.filteredInvoices?.length === 0 && <NoInvoices />}

      <div className={"flex flex-col gap-6 pb-6 pt-3 lg:gap-6 "}>
        {/* invoice previews */}
        {invoices?.length > 0 &&
          state.filteredInvoices?.map((invoice) => {
            return <InvoicePreview invoice={invoice} key={invoice?.id} />;
          })}
      </div>
    </div>
  );
};
