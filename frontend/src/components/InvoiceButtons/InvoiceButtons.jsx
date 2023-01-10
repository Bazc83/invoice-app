import { Button } from '@/components/Button';
import { useInvoiceContext } from '@/context/useInvoiceContext';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { useNavigate } from 'react-router-dom';
export const InvoiceButtons = ({ setShowInvoiceForm }) => {
  const navigate = useNavigate();
  const { invoiceData, invoiceId } = useInvoiceContext();

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
          onClick={() => setShowInvoiceForm((prev) => !prev)}>
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
