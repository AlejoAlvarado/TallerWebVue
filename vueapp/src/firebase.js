import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyC1HP4pE47_EV74njlI1wkKIWRo8UGSUwc",
  authDomain: "tallergestionusuariosvue.firebaseapp.com",
  databaseURL: "https://tallergestionusuariosvue.firebaseio.com",
  projectId: "tallergestionusuariosvue",
  storageBucket: "tallergestionusuariosvue.appspot.com",
  messagingSenderId: "244542355985",
  appId: "1:244542355985:web:205e0e23932e07c05a8fb0",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("Users");
const dependenciesCollection = db.collection("Dependencies");


// export utils/refs
export {
  db,
  auth,
  usersCollection,
  dependenciesCollection,
};
