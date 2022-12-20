import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceForm } from '@/pages/Invoices/Invoice/InvoiceForm';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
// import data from '@data/data.json';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InvoicesContext } from '../../../context/InvoicesData';
import styles from './Invoice.module.css';
import { InvoiceButtons } from './InvoiceButtons';
import { InvoiceMain } from './InvoiceMain';

export const Invoice = () => {
  const { invoices } = useContext(InvoicesContext);

  const { invoiceId } = useParams();

  const [invoiceData, setInvoiceData] = useState();

  const [showEdit, setShowEdit] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const invoice = invoices?.filter((invoice) => invoice.id === invoiceId);

    setInvoiceData({ ...invoice[0] });

    if (invoices) {
      setIsLoading(false);
    }
  }, [invoices]);

  if (isLoading) return null;

  return (
    <div>
      <div className={styles.invoice}>
        {showEdit && (
          <InvoiceForm
            setShowEdit={setShowEdit}
            invoiceId={invoiceId}
            invoiceData={invoiceData}
          />
        )}

        <div
          className={`${styles.mainWrapper} ${
            showEdit && styles.mainWrapperOverlay
          }`}>
          <div className={` container ${styles.invoiceWrapper}`}>
            {/* Go back to invoices page link */}
            <GoBackLink linkPath={'/invoices'} />

            <div className={`${styles.invoiceContent} text`}>
              <div
                className={`container secondary-bg ${styles.statusAndButtons}`}>
                <div className={`secondary-bg ${styles.status}`}>
                  <p>Status</p>
                  <PaymentStatus status={invoiceData?.status} />
                </div>

                <div className={styles.buttonWrapperTop}>
                  <InvoiceButtons setShowEdit={setShowEdit} />
                </div>
              </div>

              <InvoiceMain
                invoiceId={invoiceId}
                invoiceData={invoiceData}
                invoiceCreatedAt={invoiceData?.createdAt}
              />
            </div>
          </div>

          <div
            className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
            <InvoiceButtons setShowEdit={setShowEdit} />
          </div>
        </div>
      </div>
    </div>
  );
};
