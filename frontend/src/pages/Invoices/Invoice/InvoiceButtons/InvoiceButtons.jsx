import { Button } from '@/components/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteInvoice } from '../../../../features/invoice/invoicesSlice';
import styles from './InvoiceButtons.module.css';

export const InvoiceButtons = ({ setShowEdit, invoice }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <>
      <Button btnStyle='btnThree' onClick={() => setShowEdit((prev) => !prev)}>
        Edit
      </Button>
      <Button
        btnStyle='btnFive'
        onClick={() => {
          dispatch(deleteInvoice(invoice.id));
          navigate('/');
        }}>
        Delete
      </Button>
      <Button>Mark as Paid</Button>
    </>
  );
};
