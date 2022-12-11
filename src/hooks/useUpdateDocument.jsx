import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

export const useUpdateDocument = () => {
  const updateDocument = async (documentToUpdate, updateObj) => {
    const docToUpdateRef = doc(db, 'invoices', documentToUpdate);

    await updateDoc(docToUpdateRef, updateObj);
  };

  return { updateDocument };
};
