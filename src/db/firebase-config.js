// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjKkZZY404GAj7XMYL58AAXE-r2d07tmQ",
  authDomain: "kayu-ecommerce.firebaseapp.com",
  projectId: "kayu-ecommerce",
  storageBucket: "kayu-ecommerce.appspot.com",
  messagingSenderId: "1095761086241",
  appId: "1:1095761086241:web:7408fc3cf5cca8780e6060"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
