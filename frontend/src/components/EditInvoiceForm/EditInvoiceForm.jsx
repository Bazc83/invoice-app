import { InvoiceContext } from '@/context/InvoiceContext';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceForm } from '../InvoiceForm';

export const EditInvoiceForm = () => {
  const { state, dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  useEffect(() => {
    if (invoiceData !== undefined) {
      dispatch({ type: 'setFormData', payload: invoiceData });
    }
  }, [invoiceData, dispatch]);

  const [itemsArray, setItemsArray] = useState(invoiceData?.items);

  // Update Invoice
  const { updateInvoiceMutation } = useUpdateInvoice();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: state.formData,
    });

    dispatch({ type: 'hideEditForm' });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    updateInvoiceMutation.reset();
    dispatch({ type: 'hideEditForm' });
  };

  useEffect(() => {
    dispatch({ type: 'setFormDataItems', payload: itemsArray });
  }, [itemsArray, dispatch]);

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <InvoiceForm
      formData={state.formData}
      itemsArray={itemsArray}
      setItemsArray={setItemsArray}
      handleFormSubmit={handleFormSubmit}
      handleCancel={handleCancel}
    />
  );
};
