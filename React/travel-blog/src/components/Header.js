import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';

const Header = () =>
    <header className="container-fluid main-theme">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                <Link to={routes.LANDING}><span className="main-title">Travel Navigator</span></Link>
                </div>
                <div className="col-md-6 login-btn-wrapper">
                    <AuthUserContext.Consumer>
                        {authUser => authUser
                            ? 
                                <div>
                                    <div className="username">
                                        <span>{authUser.username}</span>
                                    </div>
                                    <SignOutButton />
                                </div>
                            :
                                <div>
                                    <Link className='btn btn-success' to={routes.SIGN_IN}>Sign In</Link>
                                </div>
                        }
                    </AuthUserContext.Consumer>
                </div>
            </div>
        </div>
    </header>

export default Header;