import { initializeApp } from "firebase/app";
import { FirebaseApp } from "firebase/app";
import REACT_APP_FIREBASE_KEY from "../secret";
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: "wordlle.firebaseapp.com",
  projectId: "wordlle",
  storageBucket: "wordlle.appspot.com",
  messagingSenderId: "160269191153",
  appId: "1:160269191153:web:68c8585864bfd0eb75a650",
};

const app = initializeApp(firebaseConfig);

export default app;
