import { InvoiceButtons } from '@/components/InvoiceButtons';
import { PaymentStatus } from '@/components/PaymentStatus';
import styles from './Invoice.module.css';

export const PaymentStatusAndButtons = ({ setShowEdit, invoiceData }) => {
  return (
    <div className={`container secondary-bg ${styles.statusAndButtons}`}>
      <div className={`secondary-bg ${styles.status}`}>
        <p>Status</p>

        <PaymentStatus status={invoiceData?.status} />
      </div>

      {/* Another InvoiceButtons component further down */}
      <div className={styles.buttonWrapperTop}>
        <InvoiceButtons setShowEdit={setShowEdit} />
      </div>
    </div>
  );
};
