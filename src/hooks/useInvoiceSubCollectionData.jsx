import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../Firebase/Firebase';

export const useInvoiceSubCollectionData =  () => {
  const [subCollectionData, setSubCollectionData] = useState([]);

  const getSubCollectionData= async (idToQuery) => {
    
    const invoiceRef = collection(db, 'invoices', idToQuery, "items");
    const q = query(invoiceRef);
 
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSubCollectionData(prev => [...prev?.filter(val => val.name !== doc.data().name), doc.data()]);
    });
  };

  return { subCollectionData, getSubCollectionData};
};
