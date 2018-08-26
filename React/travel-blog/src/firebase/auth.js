import { auth } from './firebase';
// import { EmailAuthProvider } from '../../node_modules/@firebase/auth-types';

//Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => 
    auth.createUserWithEmailAndPassword(email, password)

//Sign In 
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password)

//Sign Out 
export const doSignOut = () =>
    auth.signOut()
    
//Password reset
export const doPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email)

//Password change
export const doPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password)
