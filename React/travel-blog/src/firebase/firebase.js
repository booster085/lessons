import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    
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