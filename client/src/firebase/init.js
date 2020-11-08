import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import 'firebase/analytics'

var firebaseConfig = {
    apiKey: "AIzaSyD_riY4ZJftP-bQchnaWMc5M29Ag84hoTo",
    authDomain: "chkdchat.firebaseapp.com",
    databaseURL: "https://chkdchat.firebaseio.com",
    projectId: "chkdchat",
    storageBucket: "chkdchat.appspot.com",
    messagingSenderId: "81378416693",
    appId: "1:81378416693:web:1726cd597c27bf7854797c",
    measurementId: "G-EE4FS9MRJJ"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();