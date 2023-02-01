import { Button } from '../Button';
import styles from './InvoiceForm.module.css';

export function FormButtons({ handleCancel, handleFormSubmit }) {
  return (
    <div className={styles.formButtons}>
      <Button onClick={handleCancel} btnStyle="btnThree">
        Cancel
      </Button>
      <Button onClick={handleFormSubmit}>Save Changes</Button>
    </div>
  );
}

export default FormButtons;
