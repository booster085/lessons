import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAn62nRHaeIXkWaFMBStqjYvZLLmE7e-2A",
    authDomain: "travel-blog-bd9ca.firebaseapp.com",
    databaseURL: "https://travel-blog-bd9ca.firebaseio.com",
    projectId: "travel-blog-bd9ca",
    storageBucket: "travel-blog-bd9ca.appspot.com",
    messagingSenderId: "686723386169"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

export {
    auth,
    db,
    storage
};