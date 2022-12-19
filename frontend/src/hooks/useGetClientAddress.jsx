import { db } from '@Firebase/Firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useState } from 'react';

export const useGetClientAddress = () => {
  const [clientAddress, setClientAddress] = useState([]);

  const getClientAddress = async (idToQuery) => {
    const invoiceRef = collection(db, 'invoices', idToQuery, 'clientAddress');
    const q = query(invoiceRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setClientAddress(doc.data());
    });
  };

  return { clientAddress, getClientAddress };
};
