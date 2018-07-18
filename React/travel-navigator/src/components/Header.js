import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import SignIn from './SignIn';
import { SIGN_IN, LANDING } from '../constants/routes';
import { auth } from 'firebase';

export default class Header extends Component {
    handleClickHomePage = () => {

    }
    render() {
        const user = auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;

        // if (user != null) {
        // name = user.displayName;
        // email = user.email;
        // photoUrl = user.photoURL;
        // emailVerified = user.emailVerified;
        // uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
        //                 // this value to authenticate with your backend server, if
        //                 // you have one. Use User.getToken() instead.
        // }
        return (
            <header className="container-fluid main-theme">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                        <Link to={`/`}><span className="main-title">Travel Navigator</span></Link>
                        </div>
                        <div className="col-md-6 login-btn-wrapper">
                        <Switch>
                            <Route path={SIGN_IN}/>
                            <Route path={LANDING} component={SignIn}/>
                        </Switch>
                            {/* <Route path="/app" component={requireAuth(ToDoList)} /> */}
                            <div className="username">
                                <span>Booster</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
// import requireAuth from './components/auth/requireAuth';

// export default connect(null, { fetchUser })(App);
