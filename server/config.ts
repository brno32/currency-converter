import dotenv from "dotenv";
import firebase from "firebase";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const EXCHANGE_API_ID = process.env.EXCHANGE_API_ID;
export const PORT = process.env.PORT;

export const BASE_CURRENCY = process.env.BASE_CURRENCY;
export const ratesEndpoint = "https://openexchangerates.org/api/latest.json";
export const currenciesEndpoint =
  "https://openexchangerates.org/api/currencies.json";

export default db;
