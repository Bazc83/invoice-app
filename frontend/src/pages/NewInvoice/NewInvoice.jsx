/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

import CancelEditFormModal from '@/components/CancelEditFormModal';
import useModalStore from '@/context/useModalStore';
import useAddNewInvoice from '@/hooks/reactQueryHooks/useAddNewInvoice';
import useInvoiceId from '@/hooks/reactQueryHooks/useInvoiceId';
import useUpdateInvoiceId from '@/hooks/reactQueryHooks/useUpdateInvoiceId';

import NewInvoiceForm from './NewInvoiceForm';

export function NewInvoice() {
  const { email: currentUserEmail } = JSON.parse(localStorage.getItem('user'));

  // const navigate = useNavigate();
  const confirmationModal = useModalStore((s) => s.confirmationModal);

  const { data: invoiceId, isLoading, isError } = useInvoiceId();

  const [newInvoiceId, setNewInvoiceId] = useState('');

  const showConfirmationModal = useModalStore((s) => s.showConfirmationModal);

  const { newInvoiceMutation } = useAddNewInvoice(newInvoiceId);

  // update invoiceId
  const { updateIdMutation } = useUpdateInvoiceId();
  const handleFormSubmit = (data) => {
    const payloadData = {
      ...data,
      id: invoiceId,
      createdByUser: currentUserEmail,
    };

    newInvoiceMutation.mutate({
      invoiceData: payloadData,
    });

    // increase invoice id by one
    updateIdMutation.mutate();
  };

  // Handle cancel adding new invoice
  const handleCancel = () => {
    showConfirmationModal();
  };

  useEffect(() => {
    if (invoiceId) {
      setNewInvoiceId(invoiceId);
    }
  }, [invoiceId]);

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error</div>;
  if (!newInvoiceId) return <div>Loading...</div>;

  return (
    <div className="primary-bg relative flex h-max flex-col pb-10 pt-6 sm:px-6 md:pt-8  ">
      {/* confirm cancel modal */}
      {confirmationModal && <CancelEditFormModal />}

      <NewInvoiceForm
        handleFormSubmit={handleFormSubmit}
        handleCancel={handleCancel}
        newInvoiceId={newInvoiceId}
      />
    </div>
  );
}

export default NewInvoice;
