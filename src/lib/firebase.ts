import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2AqkK5rSvGJoP75s5Eu2OZBbf5945WjQ",
  authDomain: "hidden-context-0cbh2.firebaseapp.com",
  projectId: "hidden-context-0cbh2",
  storageBucket: "hidden-context-0cbh2.firebasestorage.app",
  messagingSenderId: "337920752742",
  appId: "1:337920752742:web:81161ab860082f926601a7",
  databaseId: "ai-studio-12742de7-17d4-42f8-93f8-fd59304faa2c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
