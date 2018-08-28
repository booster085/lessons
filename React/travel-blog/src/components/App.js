import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import HomePage from './Home';
import AccountPage from './Account';
import AddTravelPage from './AddTravel';
import ViewTravelPage from './ViewTravel';
import MyTravelsPage from './MyTravels';
import AdminPage from './Admin';
import Header from './Header';
import Contacts from './Contacts';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

const App = () => 
    <Router>
        <div className="wrapper">
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <Navigation />
                    </div>
                    <div className="col-md-10">
                        <main>
                            <Route exact path={routes.DIARY_SINGLE} component={ViewTravelPage}></Route>
                            <Route exact path={routes.LANDING} component={() => <LandingPage />}/>
                            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />}/>
                            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />}/>
                            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />}/>
                            <Route exact path={routes.PASSWORD_CHANGE} component={() => <PasswordChangeForm />}/>
                            <Route exact path={routes.HOME} component={() => <HomePage />}/>
                            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />}/>
                            <Route exact path={routes.DIARY} component={() => <MyTravelsPage />}/>
                            <Route exact path={routes.DIARY_ADD} component={() => <AddTravelPage />}/>
                            <Route exact path={routes.ADMIN} component={() => <AdminPage />}/>
                            <Route exact path={routes.CONTACTS} component={() => <Contacts />}/>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </Router>

export default withAuthentication(App);