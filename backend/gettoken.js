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




// initialize dummy data for testing
// {
//    "jobId": "test-job-123",
//   "clientId": "sample-client-id",
//   "artisanId": "sample-artisan-id",
//   "totalAmount": 1000,
//   "email":"robert@gmail.com"
// }

//recipient data testing 
// {
//   "artisanId": "artisan123",
//   "accountName": "John Doe",
//   "accountNumber": "1424059566",
//   "bankCode": "044"
// }

//data to test release
//http://localhost:4000/api/payments/release/test-job-123


