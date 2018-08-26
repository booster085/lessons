import React from 'react';

import AuthUserContext from './AuthUserContext';
import Button from './buttons/Button';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const LandingPage = () =>
    <div>
        <h1>Welcome to your personal travel diary</h1>
        <h2>Create your own travel diary to capture and share your travel experiences!</h2>
        <div>
            <AuthUserContext.Consumer>
                { authUser => authUser
                    ? 
                        <Link to={routes.DIARY_ADD}>
                            <Button  btnClass={'btn btn-warning btn-lg'} btnText={'Add to diary'}/>
                        </Link>
                    : 
                        <Link to={routes.SIGN_UP}>
                            <Button  btnClass={'btn btn-warning btn-lg'} btnText={'Start your first diary'}/>
                        </Link>
                }
            </AuthUserContext.Consumer>
        </div>
    </div>

export default LandingPage;