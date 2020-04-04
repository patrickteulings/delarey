import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


export const fb = firebase
.initializeApp({
  projectId: 'delarey-b9a27',
  apiKey: 'AIzaSyBNE8iINk1aJL2o57jlg2TgvJsQUUKMtWQ',
  authDomain: 'gratitude-945f7.firebaseapp.com' });
// Get a Firestore instance
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const provider = googleProvider;
export const db = fb.firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { TimeStamp, GeoPoint } = firebase.firestore
// export { TimeStamp, GeoPoint }
