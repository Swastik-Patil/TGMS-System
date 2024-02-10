// FirebaseContext.js
import { createContext, useContext } from "react";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);
