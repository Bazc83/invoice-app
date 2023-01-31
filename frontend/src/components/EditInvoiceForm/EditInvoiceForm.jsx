import { InvoiceContext } from "@/context/InvoiceContext";
import { useFilterInvoiceById } from "@/hooks/reactQueryHooks/useFilterInvoiceById";
import { useUpdateInvoice } from "@/hooks/reactQueryHooks/useUpdateInvoice";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InvoiceForm } from "../InvoiceForm";

export const EditInvoiceForm = () => {
  const { state, dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const [itemsArray, setItemsArray] = useState(invoiceData?.items);

  // Update Invoice
  const { updateInvoiceMutation } = useUpdateInvoice();

  const handleFormSubmit = (data) => {
    const payloadData = { ...data, items: itemsArray };
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
    }
  }, [invoiceData, dispatch]);

  useEffect(() => {
    dispatch({ type: "setFormDataItems", payload: itemsArray });
  }, [itemsArray, dispatch]);

  const handleAddItemToQuery = () => {
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: state.formData,
    });
  };

  // Should only run when form is saved/submitted

  // useEffect(() => {
  //   updateInvoiceMutation.mutate({
  //     invoiceId: invoiceId,
  //     invoiceData: state.formData,
  //   });
  // }, [state.formData]);

  if (isLoading) return "Loading...";

  if (isError) return "An error has occurred: " + error.message;

  return (
    <InvoiceForm
      formData={state.formData}
      itemsArray={itemsArray}
      setItemsArray={setItemsArray}
      handleFormSubmit={handleFormSubmit}
      handleCancel={handleCancel}
      handleAddItemToQuery={handleAddItemToQuery}
    />
  );
};
