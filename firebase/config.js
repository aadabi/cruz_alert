import * as fireb from 'firebase';
import firebaseConfig from '../constants/firebase';

const {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
  messagingSenderId,
} = firebaseConfig;

let firebaseInitialized = false;

if (
  apiKey !== 'null' &&
  authDomain !== 'null' &&
  databaseURL !== 'null' &&
  storageBucket !== 'null' &&
  messagingSenderId !== 'null'
) {
  fireb.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    messagingSenderId,
  });

  firebaseInitialized = true;
}

export const firebaseRef = firebaseInitialized ? fireb.database().ref() : null;
export const firebaseApp = firebaseInitialized ? fireb : null;
