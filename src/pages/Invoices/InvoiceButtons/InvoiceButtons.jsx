import { Button } from '@/components/Button';
import styles from './InvoiceButtons.module.css';

export const InvoiceButtons = ({ setShowEdit }) => {
  return (
    <>
      <Button btnStyle='btnThree' onClick={() => setShowEdit((prev) => !prev)}>
        Edit
      </Button>
      <Button btnStyle='btnFive'>Delete</Button>
      <Button>Mark as Paid</Button>
    </>
  );
};
