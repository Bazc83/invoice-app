import { useContext, useEffect } from 'react';

import { InvoiceContext } from '@/context/InvoiceContext';
import useModalStore from '@/context/useModalStore';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';

import { InvoiceForm } from './InvoiceForm';

export function EditInvoiceForm({ invoiceId }) {
  const { state, dispatch } = useContext(InvoiceContext);
  const hideInvoiceForm = useModalStore((s) => s.hideInvoiceForm);
  const showConfirmationModal = useModalStore((s) => s.showConfirmationModal);
  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  // Update Invoice
  const { updateInvoiceMutation } = useUpdateInvoice();

  const handleFormSubmit = (data) => {
    const payloadData = {
      ...data,
      items: state.itemsArray,
      paymentTerms: state.formData.paymentTerms,
      paymentDue: state.formData.paymentDue,
    };
    dispatch({ type: 'setFormData', payload: payloadData });

    updateInvoiceMutation.mutate({
      invoiceId,
      invoiceData: payloadData,
    });

    hideInvoiceForm();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    showConfirmationModal();
  };

  useEffect(() => {
    if (invoiceData !== undefined) {
      dispatch({ type: 'setFormData', payload: invoiceData });

      if (invoiceData.items.length > 0) {
        dispatch({ type: 'addItems', payload: invoiceData.items });
      }
    }
  }, [invoiceData, dispatch]);

  if (isLoading) return 'Loading...';

  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <InvoiceForm
      invoiceData={invoiceData}
      handleFormSubmit={handleFormSubmit}
      handleCancel={handleCancel}
    />
  );
}

export default EditInvoiceForm;
