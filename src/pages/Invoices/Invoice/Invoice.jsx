import { InvoicesContext } from '@/App';
import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceForm } from '@/pages/Invoices/Invoice/InvoiceForm';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
import data from '@data/data.json';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Invoice.module.css';
import { InvoiceButtons } from './InvoiceButtons';
import { InvoiceMain } from './InvoiceMain';

export const InvoiceContext = createContext();

export const Invoice = () => {
  const { invoiceId } = useParams();

  const [showEdit, setShowEdit] = useState(false);

  const [invoiceData, setInvoiceData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setInvoiceData(data.filter((invoice) => invoice.id === invoiceId)[0]);
  }, []);

  const [id, setId] = useState();
  const [clientName, setClientName] = useState();
  const [clientEmail, setClientEmail] = useState();
  const [clientStreet, setClientStreet] = useState();
  const [clientCity, setClientCity] = useState();
  const [clientPostCode, setClientPostCode] = useState();
  const [clientCountry, setClientCountry] = useState();
  const [invoiceCreatedAt, setInvoiceCreatedAt] = useState();
  const [invoicePaymentDue, setInvoicePaymentDue] = useState();
  const [selectedOption, setSelectedOption] = useState();

  const [invoiceDescription, setInvoiceDescription] = useState();
  const [invoiceStatus, setInvoiceStatus] = useState();
  const [invoiceItems, setInvoiceItems] = useState();
  const [invoiceTotal, setInvoiceTotal] = useState();

  useEffect(() => {
    if (invoiceData) {
      setIsLoading(false);
      setId(invoiceData?.id);
      setClientName(invoiceData?.clientName);
      setClientEmail(invoiceData?.clientEmail);
      setClientStreet(invoiceData?.clientAddress.street);
      setClientCity(invoiceData?.clientAddress.city);
      setClientPostCode(invoiceData?.clientAddress.postCode);
      setClientCountry(invoiceData?.clientAddress.country);
      setInvoiceCreatedAt(invoiceData?.createdAt);
      setInvoicePaymentDue(invoiceData?.paymentDue);
      setSelectedOption(invoiceData?.paymentTerms);
      setInvoiceItems(invoiceData?.items);
      setInvoiceTotal(invoiceData?.total);
      setInvoiceDescription(invoiceData?.description);
      setInvoiceStatus(invoiceData?.status);
      setInvoiceCreatedAt(invoiceData?.createdAt);
    }
  }, [invoiceData]);

  const invoiceValues = {
    invoiceStatus,
    id,
    invoiceDescription,
    clientName,
    clientEmail,
    clientStreet,
    clientCity,
    clientCountry,
    clientPostCode,
    invoiceCreatedAt,
    selectedOption,
    invoiceItems,
    invoiceTotal,
    invoicePaymentDue,
  };

  
  if (isLoading) return null;

  return (
    <InvoiceContext.Provider value={invoiceValues}>
      <div className={styles.invoice}>
        {showEdit && (
          <InvoiceForm
            setShowEdit={setShowEdit}
            invoiceId={invoiceId}
            invoiceData={invoiceData}
            InvoiceValues={InvoiceValues}
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
                  <PaymentStatus status={invoiceStatus} />
                </div>

                <div className={styles.buttonWrapperTop}>
                  <InvoiceButtons setShowEdit={setShowEdit} />
                </div>
              </div>

              <InvoiceMain
                invoiceId={invoiceId}
                invoiceData={invoiceData}
                invoiceCreatedAt={invoiceCreatedAt}
              />
            </div>
          </div>

          <div
            className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
            <InvoiceButtons setShowEdit={setShowEdit} />
          </div>
        </div>
      </div>
    </InvoiceContext.Provider>
  );
};
