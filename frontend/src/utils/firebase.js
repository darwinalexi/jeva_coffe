import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_LvooDkga0cOL9uC4tzjEQSWx8NdC_po",
  authDomain: "jeva-93e66.firebaseapp.com",
  projectId: "jeva-93e66",
  storageBucket: "jeva-93e66.appspot.com", // ✅ corregido
  messagingSenderId: "713376076210",       // ✅ corregido
  appId: "1:713376076210:web:56f6b28c1cfbd8b7e554ab",
  measurementId: "G-1ELX4FK7NS"            // (opcional, solo si usas analytics)
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
