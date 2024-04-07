
import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA7snqUeB8PsnXan6Kcla8h-e3YU9ebHJM",
    authDomain: "info6132-lab4.firebaseapp.com",
    projectId: "info6132-lab4",
    storageBucket: "info6132-lab4.appspot.com",
    messagingSenderId: "799046996897",
    appId: "1:799046996897:web:fa489b0c7d6f4176eff1e0"
  };

// initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = 'transactions';
const dbCollection = collection(db, collectionName);



export const firebaseHelper = {
    fetchTransactions() {
        console.log("data")
        return getDocs(dbCollection)
    },

    addTransaction(newTransaction) {
        return addDoc(dbCollection, newTransaction)
    },
}


export {app, db };
