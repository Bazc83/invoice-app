import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceForm } from '@/pages/Invoices/Invoice/InvoiceForm';
import { PaymentStatus } from '@/pages/Invoices/PaymentStatus';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInvoiceData } from '../../../hooks/useInvoiceData';
import { db } from '../../../Firebase/Firebase';
import styles from './Invoice.module.css';
import { InvoiceButtons } from './InvoiceButtons';
import { InvoiceMain } from './InvoiceMain';

export const Invoice = () => {
  const { invoiceId } = useParams();
  // const [invoiceState, setInvoiceState] = useState();
  // const [clientName, setClientName] = useState();
  // const [clientEmail, setClientEmail] = useState();
  // const [description, setDescription] = useState();
  // const [paymentDue, setPaymentDue] = useState();
  // const [paymentTerms, setPaymentTerms] = useState();
  // const [status, setStatus] = useState();
  // const [createdAt, setCreatedAt] = useState();
  // const [items, setItems] = useState([]);

  // const [clientAddress, setClientAddress] = useState({
  //   street: '',
  //   city: '',
  //   postCode: '',
  //   country: '',
  // });

  const [showEdit, setShowEdit] = useState(false);

  // const getData = async (idToQuery) => {
  //   const invoiceRef = collection(db, 'invoices');
  //   const q = query(invoiceRef, where('id', '==', idToQuery));
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach((doc) => {
  //     setClientName(doc.data().clientName);
  //     setClientEmail(doc.data().clientEmail);
  //     setCreatedAt(doc.data().createdAt);
  //     setPaymentDue(doc.data().paymentDue);
  //     setPaymentTerms(doc.data().paymentTerms);
  //     setStatus(doc.data().status);
  //     setDescription(doc.data().description);
  //   });
  // };

  // const getClientAddress = async (idToQuery) => {
  //   const invoiceRef = collection(db, 'invoices', idToQuery, 'clientAddress');
  //   const q = query(invoiceRef);
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setClientAddress({
  //       street: doc.data().street,
  //       city: doc.data().city,
  //       postCode: doc.data().postCode,
  //       country: doc.data().country,
  //     });
  //   });
  // };

  // const getItems = async (idToQuery) => {
  //   const invoiceRef = collection(db, 'invoices', idToQuery, 'items');
  //   const q = query(invoiceRef);
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setItems((prev) => [
  //       ...prev.filter((item) => item.id !== doc.id),
  //       {
  //         id: doc.id,
  //         name: doc.data().name,
  //         quantity: doc.data().quantity,
  //         price: doc.data().price,
  //       },
  //     ]);
  //   });
  // };
  // //

  const { mainInvoiceData, data } = useInvoiceData();

  useEffect(() => {
    mainInvoiceData(invoiceId);
    // getData(invoiceId);
    // getItems(invoiceId);
    // getClientAddress(invoiceId);

    // setInvoiceState(data.filter((invoice) => invoice.id === invoiceId)[0]);
  }, [invoiceId]);


  return (
    <div className={styles.invoice}>
      {showEdit && (
        <InvoiceForm setShowEdit={setShowEdit} />
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
                <PaymentStatus status={data?.status} />
              </div>

              <div className={styles.buttonWrapperTop}>
                {' '}
                <InvoiceButtons setShowEdit={setShowEdit} />
              </div>
            </div>

            <InvoiceMain invoiceId={invoiceId} />
          </div>
        </div>

        <div className={`secondary-bg container ${styles.buttonWrapperBottom}`}>
          <InvoiceButtons setShowEdit={setShowEdit} />
        </div>
      </div>
    </div>
  );
};
