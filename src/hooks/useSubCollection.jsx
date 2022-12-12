import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../Firebase/Firebase';

export const useSubCollection =  () => {
  const [subCollectionData, setSubCollectionData] = useState([]);
  const getSubCollectionData= async (idToQuery, subCollectionName) => {
    const invoiceRef = collection(db, 'invoices', idToQuery, subCollectionName);
    const q = query(invoiceRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSubCollectionData(prev => [...prev?.filter(val => val.name !== doc.data().name), doc.data()]);
    });
  };

  return { subCollectionData, getSubCollectionData};
};
