import { todosRef, authRef, provider } from '../config/firebase';
import { FETCH_TODOS, FETCH_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL } from './types';

export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: FETCH_USER,
                payload: user
            })
        } else {
            dispatch({
                type: FETCH_USER,
                payload: null
            })
        }
    })
}

export const signUp = (email, password) => dispatch => {
    authRef
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            return dispatch(createUserSuccess(res));
        })
        .catch(error => {
            console.log(error)
            return dispatch(createUserFail)
        })
}

export const signIn = (email, password) => dispatch => {
    authRef
        .signInWithEmailAndPassword(email, password)
        .then(result => {})
        .catch(error => {
            console.log(error)
        })
}

export const signOut = () => dispatch => {
    authRef
        .signOut()
        .then(() => {
            //Sign out successful
        })
        .catch(error => {
            console.log(error)
        })
}

export const createUserSuccess = (res) => {
    return {
        type: CREATE_USER_SUCCESS,
        user: res
    }
}
export const createUserFail = (error) => {
    return {
        type: CREATE_USER_FAIL,
        error
    }
}