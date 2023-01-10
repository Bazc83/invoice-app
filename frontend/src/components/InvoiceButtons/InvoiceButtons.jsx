import { Button } from '@/components/Button';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { InvoiceContext } from '@/pages/Invoice';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export const InvoiceButtons = ({ setShowEdit, invoiceId }) => {
  const { invoiceData } = useContext(InvoiceContext);

  const navigate = useNavigate();

  const { deleteSelectedInvoice, isLoading } = useDeleteInvoice();

  const { updateInvoiceMutation } = useUpdateInvoice(invoiceId, invoiceData);

  const handleDeleteInvoice = async () => {
    await deleteSelectedInvoice(invoiceData.id);
    navigate('/');
  };

  const setStatus = (statusValue) => {
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: { ...invoiceData, status: statusValue },
    });
  };

  return (
    <>
      {invoiceData?.status === 'draft' && (
        <Button
          btnStyle='btnThree'
          onClick={() => setShowEdit((prev) => !prev)}>
          Edit
        </Button>
      )}
      <Button
        btnStyle='btnFive'
        onClick={() => handleDeleteInvoice(invoiceData.id)}>
        {isLoading ? '...Deleting' : 'Delete'}
      </Button>

      {invoiceData?.status !== 'paid' && invoiceData?.status !== 'draft' && (
        <Button onClick={() => setStatus('paid')}>Mark as Paid</Button>
      )}

      {invoiceData?.status === 'draft' && (
        <Button onClick={() => setStatus('pending')}>Mark as Pending</Button>
      )}

      {invoiceData?.status !== 'draft' &&
        invoiceData?.status === 'pending' &&
        invoiceData?.status !== 'paid' && (
          <Button onClick={() => setStatus('draft')}>Draft</Button>
        )}
    </>
  );
};
