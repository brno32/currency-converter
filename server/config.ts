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

export const API_ID = process.env.API_ID;
export const PORT = process.env.PORT;

export const baseCurrency = process.env.BASE;
export const ratesEndpoint = "https://openexchangerates.org/api/latest.json";

export default db;
