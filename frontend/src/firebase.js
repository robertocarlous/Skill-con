import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqwI5ygQaXF0kgogKHd4XkpwdY7S-HGu4",
  authDomain: "skill-con-bdb47.firebaseapp.com",
  projectId: "skill-con-bdb47",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
