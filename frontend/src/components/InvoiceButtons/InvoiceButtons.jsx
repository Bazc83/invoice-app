import { Button } from '@/components/Button';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';
import { useNavigate } from 'react-router-dom';
export const InvoiceButtons = ({ setShowEdit, invoiceData }) => {
  const navigate = useNavigate();

  const { deleteSelectedInvoice, isLoading } = useDeleteInvoice();

  const handleDeleteInvoice = async () => {
    await deleteSelectedInvoice(invoiceData.id);
    navigate('/');
  };

  const handleMarkAsPaid = () => {
    console.log('Mark as paid function');
  };
  return (
    <>
      <Button btnStyle='btnThree' onClick={() => setShowEdit((prev) => !prev)}>
        Edit
      </Button>
      <Button
        btnStyle='btnFive'
        onClick={() => handleDeleteInvoice(invoiceData.id)}>
        {isLoading ? '...Deleting' : 'Delete'}
      </Button>
      <Button onClick={handleMarkAsPaid}>Mark as Paid</Button>
    </>
  );
};
