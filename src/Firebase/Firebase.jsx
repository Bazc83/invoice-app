// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCKpSVdTH_CChA799Y5nVj-OAkF2ejAwu8',
  authDomain: 'invoice-app-7a204.firebaseapp.com',
  projectId: 'invoice-app-7a204',
  storageBucket: 'invoice-app-7a204.appspot.com',
  messagingSenderId: '1037058782154',
  appId: '1:1037058782154:web:5c99bb623d76ac85909533',
  measurementId: 'G-DK22WBRQQT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

import { useCollection } from 'react-firebase-hooks/firestore';
export const getFirestoreCollection = (dbCollection) => {
  const [value, loading, error] = useCollection(collection(db, dbCollection), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // {value && 
  //   value.docs.map((doc) => console.log(doc.id));
  // }

  return {value, loading, error}
};
