import { Button } from '@/components/Button';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';

import { useNavigate } from 'react-router-dom';
export const InvoiceButtons = ({ setShowEdit, invoice }) => {
  const navigate = useNavigate();

  const { deleteSelectedInvoice, isLoading } = useDeleteInvoice();

  const handleDeleteInvoice = async () => {
    await deleteSelectedInvoice(invoice.id);
    navigate('/');
  };

  return (
    <>
      <Button btnStyle='btnThree' onClick={() => setShowEdit((prev) => !prev)}>
        Edit
      </Button>
      <Button
        btnStyle='btnFive'
        onClick={() => handleDeleteInvoice(invoice.id)}>
        {isLoading ? '...Deleting' : 'Delete'}
      </Button>
      <Button>Mark as Paid</Button>
    </>
  );
};
