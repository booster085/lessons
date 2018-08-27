import { db } from './firebase';
import { storage } from './firebase';
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
export const doAddTravel = (uid, title, short, description, images) => {
    let travelId = db.ref('posts').push().key;
    let data = {};
    data['/' + travelId] = {
        uid: uid,
        short: short,
        description: description,
        title: title,
        dateTime: new Date()
    };
    let imagesStorageRef = storage.ref('images');
    if (images) {
        Object.keys(images).map(i => {
            let imageRef = imagesStorageRef.child(images[i].name);
            imageRef.put(images[i]);
        })
    }

    return db.ref('posts').update(data)
    
}

export const onceGetTravels = () =>
    db.ref('travels').once('value');
