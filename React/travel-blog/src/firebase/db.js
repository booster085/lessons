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
const uploadImages = (images, travelId) => {
    let dataImages = {};
    let imagesStorageRef = storage.ref('images');
    let result = Object.keys(images).map(i => {
        let imageRef = imagesStorageRef.child(images[i].name);
        let uploadTask = imageRef.put(images[i])
        return new Promise((resolve, reject) => {
                uploadTask.on('state_changed', snapshot => {
            }, error => {
                console.log('Upload failed')
            }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        dataImages[i] = downloadURL;
                        resolve('done');
                    })
                }
            );
        })
    })
    return Promise.all(result).then((res) => {
        return dataImages
    })
}
export const doAddTravel = (user, title, short, description, images) => {
    let travelId = db.ref('posts').push().key;
    let data = {}
        data['/' + travelId] = {
            uid: user.uid,
            username: user.username,
            short: short,
            description: description,
            title: title,
            dateTime: new Date()
        };
    if (!images) {
        return db.ref('posts').update(data)
    } else {
        db.ref('posts').update(data)
        return uploadImages(images, travelId).then((imagesUrls) => {
            return db.ref('/posts/' + travelId).update({
                images: imagesUrls
            });
        })
    }

}

export const onceGetUserTravels = (uid) => {
    return db.ref('posts').orderByChild('uid').equalTo(uid).once('value');
}

export const onceGetTravel = (tid) => {
    return db.ref('posts').orderByKey().equalTo(tid).once('value');
}

export const onceGetAllTravels = () =>
    db.ref('posts').once('value');
