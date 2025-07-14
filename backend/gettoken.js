const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
    apiKey: 'AIzaSyBqwI5ygQaXF0kgogKHd4XkpwdY7S-HGu4',
    authDomain: 'skill-con-bdb47.firebaseapp.com',
    projectId: 'skill-con-bdb47',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function getToken() {
    const email = 'robbert@gmail.com';       
    const password = 'robbert';             

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        console.log('Firebase ID Token:', idToken);
    } catch (error) {
        console.error('Error signing in:', error.message);
    }
}

getToken();
