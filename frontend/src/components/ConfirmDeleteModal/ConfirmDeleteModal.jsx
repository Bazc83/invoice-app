import { Button } from '../Button';
import styles from './ConfirmDeleteModal.module.css';

export const ConfirmDeleteModal = ({
  setShowDeleteModal,
  handleDeleteInvoice,
  invoiceId,
}) => {
  return (
    <div className={`${styles.confirmDeleteModal}`}>
      <h1>Confirm Delete</h1>
      <p className='text-faded-lg'>
        Are you sure you want to delete invoice {invoiceId}? This action cannot
        be undone
      </p>
      <div>
        <Button onClick={() => setShowDeleteModal(false)} btnStyle={'btnThree'}>
          Cancel
        </Button>
        <Button onClick={handleDeleteInvoice} btnStyle={'btnFive'}>
          Delete
        </Button>
      </div>
    </div>
  );
};
