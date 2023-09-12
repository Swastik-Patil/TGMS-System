import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAdJYisWpbUmq0XR2UPU31BnZ7RdBFgIa0",
  authDomain: "tgmssystem.firebaseapp.com",
  databaseURL: "https://tgmssystem-default-rtdb.firebaseio.com",
  projectId: "tgmssystem",
  storageBucket: "tgmssystem.appspot.com",
  messagingSenderId: "811068578582",
  appId: "1:811068578582:web:e9e92fc532c3611b3c4e37",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { database, storage };
export const auth = getAuth(app);
