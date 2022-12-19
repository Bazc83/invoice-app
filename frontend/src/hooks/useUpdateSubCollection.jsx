import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@Firebase/Firebase';

export const useUpdateSubCollection = () => {
  const updateSubCollection = async (parentId, subCollectionName, subCollectionId, updateObj) => {
    const docToUpdateRef = doc(db, 'invoices', parentId, subCollectionName, subCollectionId);

    await updateDoc(docToUpdateRef, updateObj);
  };

  return { updateSubCollection };
};
