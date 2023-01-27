import { InvoiceContext } from "@/context/InvoiceContext";
import { useFilterInvoiceById } from "@/hooks/reactQueryHooks/useFilterInvoiceById";
import { useUpdateInvoice } from "@/hooks/reactQueryHooks/useUpdateInvoice";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const InvoiceButtons = ({ showInvoiceControls }) => {
  const { dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const { updateInvoiceMutation } = useUpdateInvoice();

  const setStatus = (statusValue) => {
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: { ...invoiceData, status: statusValue },
    });
  };

  if (isLoading) return "Loading...";

  if (isError) return "An error has occurred: " + error.message;

  return (
    <div
      className={`secondary-bg  flex-col-reverse items-center justify-center gap-4 rounded-md p-8 md:flex md:flex-row md:justify-between shadow-md ${
        showInvoiceControls ? "flex" : "hidden"
      } `}
    >
      <button
        onClick={() => dispatch({ type: "showDeleteModal" })}
        className="btn | w-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white  sm:max-w-[500px] md:w-auto"
      >
        {isLoading ? "...Deleting" : "Delete"}
      </button>

      <div className="flex w-full flex-col-reverse items-center justify-center gap-4  sm:max-w-[500px] md:w-auto md:flex-row ">
        <button
          onClick={() => dispatch({ type: "showEditForm" })}
          className="btn | w-full  border border-gray-900 text-gray-900  hover:border-gray-900 hover:bg-gray-900 hover:text-gray-50  dark:border-gray-50  dark:text-gray-50 dark:hover:border-gray-900 md:w-auto "
        >
          Edit
        </button>

        {invoiceData?.status !== "draft" && (
          <button
            onClick={() => setStatus("draft")}
            className="btn |  w-full    border border-gray-700   bg-gray-700  text-white hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:text-white md:w-auto "
          >
            Draft
          </button>
        )}

        {invoiceData?.status !== "pending" && (
          <button
            onClick={() => setStatus("pending")}
            className="btn | w-full   border border-orange-600 bg-orange-600 text-white   hover:border-orange-900 hover:bg-orange-900 md:w-auto "
          >
            Pending
          </button>
        )}

        {invoiceData?.status !== "paid" && (
          <button
            onClick={() => setStatus("paid")}
            className="btn |  w-full   border border-emerald-600 bg-emerald-600 text-white  hover:border-emerald-900   hover:bg-emerald-900  md:w-auto "
          >
            Paid
          </button>
        )}
      </div>
    </div>
  );
};
