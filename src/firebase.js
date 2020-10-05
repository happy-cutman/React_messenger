import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDHjZIqslCZR-xH_wVPzkLSXwjavEQfRs8",
    authDomain: "react-chat-neu.firebaseapp.com",
    databaseURL: "https://react-chat-neu.firebaseio.com",
    projectId: "react-chat-neu",
    storageBucket: "react-chat-neu.appspot.com",
    messagingSenderId: "361764248975",
    appId: "1:361764248975:web:c353d5fbd1fe75aef57ffa"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

// for google auth
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;