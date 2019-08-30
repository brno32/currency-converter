import dotenv from "dotenv";
import firebase from "firebase";

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyBKvx_wRRSceEWDnnuxi2dt2s5rCSYOQHo",
  authDomain: "currency-converter-d49e5.firebaseapp.com",
  databaseURL: "https://currency-converter-d49e5.firebaseio.com",
  projectId: "currency-converter-d49e5",
  storageBucket: "",
  messagingSenderId: "343302309359",
  appId: "1:343302309359:web:67d537c333647c95"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const API_KEY = process.env.API_KEY;
export const PORT = process.env.PORT;

export default db;
