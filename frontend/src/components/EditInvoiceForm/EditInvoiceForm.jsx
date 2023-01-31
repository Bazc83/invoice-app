import { InvoiceContext } from "@/context/InvoiceContext";
import { useFilterInvoiceById } from "@/hooks/reactQueryHooks/useFilterInvoiceById";
import { useUpdateInvoice } from "@/hooks/reactQueryHooks/useUpdateInvoice";
import { useContext, useEffect } from "react";
import { InvoiceForm } from "../InvoiceForm";

export const EditInvoiceForm = ({ invoiceId }) => {
  const { state, dispatch } = useContext(InvoiceContext);

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  // const [itemsArray, setItemsArray] = useState(invoiceData?.items);

  // Update Invoice
  const { updateInvoiceMutation } = useUpdateInvoice();

  const handleFormSubmit = (data) => {
    const payloadData = { ...data, items: state.itemsArray };
    dispatch({ type: "setFormData", payload: payloadData });

    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: payloadData,
    });

    dispatch({ type: "hideEditForm" });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    updateInvoiceMutation.reset();
    dispatch({ type: "hideEditForm" });
  };

  useEffect(() => {
    if (invoiceData !== undefined) {
      dispatch({ type: "setFormData", payload: invoiceData });

      if (invoiceData.items.length > 0) {
        dispatch({ type: "addItems", payload: invoiceData.items });
      }
    }
  }, [invoiceData, dispatch]);

  if (isLoading) return "Loading...";

  if (isError) return "An error has occurred: " + error.message;

  return (
    <InvoiceForm
      formData={state.formData}
      handleFormSubmit={handleFormSubmit}
      handleCancel={handleCancel}
    />
  );
};
