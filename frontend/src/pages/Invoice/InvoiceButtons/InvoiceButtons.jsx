import { InvoiceContext } from "@/context/InvoiceContext";
import { useFilterInvoiceById } from "@/hooks/reactQueryHooks/useFilterInvoiceById";
import { useUpdateInvoice } from "@/hooks/reactQueryHooks/useUpdateInvoice";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const InvoiceButtons = () => {
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
    <>
      {invoiceData?.status === "draft" && (
        <button
          onClick={() => dispatch({ type: "showEditForm" })}
          className="btn |  w-full border border-gray-900 text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-gray-50  dark:border-gray-50  dark:text-gray-50 dark:hover:border-gray-900 lg:w-auto "
        >
          Edit
        </button>
      )}

      <button
        onClick={() => dispatch({ type: "showDeleteModal" })}
        className="btn | w-full border border-red-500 text-red-500 lg:w-auto"
      >
        {isLoading ? "...Deleting" : "Delete"}
      </button>

      {invoiceData?.status !== "paid" && invoiceData?.status !== "draft" && (
        <button
          onClick={() => setStatus("paid")}
          className="btn |     w-full border border-emerald-600 bg-emerald-600 text-white transition-colors hover:bg-transparent hover:text-emerald-900 dark:bg-transparent dark:text-emerald-600   dark:hover:bg-emerald-600 dark:hover:text-white lg:w-auto "
        >
          Paid
        </button>
      )}

      {invoiceData?.status === "draft" && (
        <button
          onClick={() => setStatus("pending")}
          className="btn |     w-full border border-gray-900 text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-gray-50  dark:border-gray-50  dark:text-gray-50 dark:hover:border-gray-900 lg:w-auto "
        >
          Pending
        </button>
      )}

      {invoiceData?.status !== "draft" &&
        invoiceData?.status === "pending" &&
        invoiceData?.status !== "paid" && (
          <button
            onClick={() => setStatus("draft")}
            className="btn |     w-full border border-gray-900 text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-gray-50  dark:border-gray-50  dark:text-gray-50 dark:hover:border-gray-900 lg:w-auto "
          >
            Draft
          </button>
        )}
    </>
  );
};
