import { InvoiceButtons } from '@/components/InvoiceButtons';
import { PaymentStatus } from '@/components/PaymentStatus';
import { useInvoiceContext } from '@/context/useInvoiceContext';
import styles from './Invoice.module.css';

export const PaymentStatusAndButtons = ({ setShowInvoiceForm }) => {
  const { invoiceData } = useInvoiceContext();

  return (
    <div className={`container secondary-bg ${styles.statusAndButtons}`}>
      <div className={`secondary-bg ${styles.status}`}>
        <p>Status</p>

        <PaymentStatus status={invoiceData?.status} />
      </div>

      {/* Another InvoiceButtons component further down */}
      <div className={styles.buttonWrapperTop}>
        <InvoiceButtons setShowInvoiceForm={setShowInvoiceForm} />
      </div>
    </div>
  );
};
