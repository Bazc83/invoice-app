import { Button } from '@/components/Button';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { useParams } from 'react-router-dom';
export const InvoiceButtons = ({ setShowInvoiceForm, setShowDeleteModal}) => {

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

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <>
      {invoiceData?.status === 'draft' && (
        <Button
          btnStyle='btnThree'
          onClick={() => setShowInvoiceForm((prev) => !prev)}>
          Edit
        </Button>
      )}
      <Button btnStyle='btnFive' onClick={() => setShowDeleteModal(true)}>
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
