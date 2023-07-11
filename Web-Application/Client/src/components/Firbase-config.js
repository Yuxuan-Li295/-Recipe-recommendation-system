import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAfuUJg4yMSXtUsvKJHQY5AcdUAnKyiET8',
  authDomain: 'cis550-349507.firebaseapp.com',
  projectId: 'cis550-349507',
  storageBucket: 'cis550-349507.appspot.com',
  messagingSenderId: '283065530314',
  appId: '1:283065530314:web:29452bf5bb6756a42d0133',
  measurementId: 'G-BHXJLJMQXP',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app);

export default firebase;
