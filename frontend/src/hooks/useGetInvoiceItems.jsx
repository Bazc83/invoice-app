import { db } from '@Firebase/Firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useState } from 'react';

export const useGetInvoiceItems = () => {
  const [items, setItems] = useState([]);
  const getItems = async (idToQuery) => {
    const invoiceRef = collection(db, 'invoices', idToQuery, 'items');
    const q = query(invoiceRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setItems((prev) => [
        ...prev?.filter((val) => val.itemId !== doc.data().itemId),
        doc.data(),
      ]);
    });
  };

  return { items, getItems };
};
