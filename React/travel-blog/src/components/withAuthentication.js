import React from 'react';
import AuthUserContext from './AuthUserContext';
import { firebase, db } from '../firebase';

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor (props) {
            super(props);

            this.state = {
                authUser: null
            }
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                let username = '';
                if (!!authUser) {
                    db.onceGetUsers().then(snapshot => {
                        authUser.username = snapshot.val()[authUser.uid].username
                        this.setState({authUser})
                    })
                    .catch(error => 
                        authUser.username = authUser.email
                    )
                } else {
                    this.setState({authUser: null})
                }
            })
        }

        render () {
            const { authUser } = this.state;
            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component />
                </AuthUserContext.Provider>
            )
        }
    }
    return WithAuthentication;
}

export default withAuthentication;