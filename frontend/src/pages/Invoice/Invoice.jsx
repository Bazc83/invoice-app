import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { EditInvoiceForm } from "@/components/EditInvoiceForm";
import { GoBackLink } from "@/components/GoBackLink";
import { InvoiceContext } from "@/context/InvoiceContext";
import { useFilterInvoiceById } from "@/hooks/reactQueryHooks/useFilterInvoiceById";
import { InvoiceButtons } from "@/pages/Invoice/InvoiceButtons";
import { useContext, useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { InvoiceMainContent } from "./InvoiceMainContent";

export const Invoice = () => {
  const { state, dispatch } = useContext(InvoiceContext);

  const [showInvoiceControls, setShowInvoiceControls] = useState(false);

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
      className={`relative mx-auto w-full  max-w-xl px-6 ${
        state.showDeleteModal &&
        "before:fixed before:inset-0 before:z-10 before:h-full before:w-full before:bg-black before:bg-opacity-60"
      }`}
    >
      {state.showDeleteModal && <ConfirmDeleteModal />}

      {state.showEditForm && <EditInvoiceForm />}

      {/* //// */}
      {/* TODO MAYBE COMBINE THIS WITH THE TOP DIV */}
      {/* //// */}
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
          <div className="flex items-baseline justify-between">
            {/* Go back to invoices page link */}
            <GoBackLink linkPath={"/invoices"} />

            <button
              onClick={() => setShowInvoiceControls((prev) => !prev)}
              className={`cursor-pointer rounded-md border-2 border-gray-800 py-1 px-1 text-lg font-semibold text-gray-800 outline-none transition-colors dark:border-gray-50 dark:text-gray-50  md:hidden `}
            >
              {showInvoiceControls ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>

          <InvoiceButtons showInvoiceControls={showInvoiceControls} />

          {/* Invoice main content */}
          <InvoiceMainContent invoiceData={invoiceData} />
        </div>
      </div>
    </div>
  );
};
