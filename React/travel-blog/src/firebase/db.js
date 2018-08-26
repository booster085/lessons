import { db } from './firebase';
//User API

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        id,
        username,
        email
    });

export const doGetUser = (id) =>
    db.ref(`users/${id}`)

export const onceGetUsers = () =>
    db.ref('users').once('value');

//Travels API
export const doAddTravel = (uid, item) =>
    db.ref(`travels/${uid}`).set({
        
    });

export const onceGetTravels = () =>
    db.ref('travels').once('value');
