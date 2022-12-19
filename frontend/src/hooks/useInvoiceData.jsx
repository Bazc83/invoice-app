import { collection, getDocs, query, where } from 'firebase/firestore';
import {  useState } from 'react';
import { db } from '@Firebase/Firebase';

export const useInvoiceData =  () => {
  const [mainInvoiceData, setMainInvoiceData] = useState();

  const getMainInvoiceData = async (idToQuery) => {
    const invoiceRef = collection(db, 'invoices');
    const q = query(invoiceRef, where('id', '==', idToQuery));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setMainInvoiceData(doc.data());
    });
  };

  return {  mainInvoiceData, getMainInvoiceData };
};
