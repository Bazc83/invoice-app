import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { EditInvoiceForm } from "@/components/EditInvoiceForm";
import { GoBackLink } from "@/components/GoBackLink";
import { PaymentStatus } from "@/components/PaymentStatus";
import { InvoiceContext } from "@/context/InvoiceContext";
import { useFilterInvoiceById } from "@/hooks/reactQueryHooks/useFilterInvoiceById";
import { InvoiceButtons } from "@/pages/Invoice/InvoiceButtons";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InvoiceMainContent } from "./InvoiceMainContent";

export const Invoice = () => {
  const { state, dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const handleCloseForm = () => {
    if (!state.showEditForm) return;
    dispatch({ type: "hideEditForm" });
  };

  useEffect(() => {
    return () => dispatch({ type: "resetInvoice" });
  }, [dispatch]);

  if (isLoading) return "Loading...";

  if (isError) return "An error has occurred: " + error.message;

  return (
    <div
      className={`relative mx-auto grid w-full max-w-3xl grid-cols-1 grid-rows-1 px-6 lg:grid-cols-12 ${
        state.showDeleteModal &&
        "before:fixed before:inset-0 before:z-10 before:h-full before:w-full before:bg-black before:bg-opacity-60"
      }`}
    >
      {state.showDeleteModal && <ConfirmDeleteModal />}

      {state.showEditForm && <EditInvoiceForm />}

      <div
        onClick={handleCloseForm}
        className={`col-span-full col-start-1  ${
          state.showEditForm &&
          "before:fixed before:inset-0 before:z-10 before:h-full before:w-full before:bg-black before:bg-opacity-60"
        }`}
      >
        <div
          className={`primary-bg relative flex max-w-3xl flex-col gap-6 py-6 md:px-4 `}
        >
          {/* Go back to invoices page link */}
          <GoBackLink linkPath={"/invoices"} />

          <div
            className={`secondary-bg flex flex-col items-center justify-center gap-8 p-8 lg:flex-row lg:justify-between`}
          >
            <div
              className={`secondary-bg flex w-full items-center justify-between gap-2 lg:justify-center`}
            >
              <p className="text">Status</p>
              <PaymentStatus status={invoiceData?.status} />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-4 ">
              <InvoiceButtons />
            </div>
          </div>

          {/* Invoice main content */}
          <InvoiceMainContent invoiceData={invoiceData} />
        </div>
      </div>
    </div>
  );
};
