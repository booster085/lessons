import React from 'react';

import AuthUserContext from './AuthUserContext';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = () =>
    <AuthUserContext.Consumer>
        {authUser =>
            <div>
                <h2>Account details</h2>
                <div className="user-details">
                    <p>Name: {authUser.username}</p>
                    <p>Email: {authUser.email}</p>
                    <p>Account created: {new Date(authUser.metadata.creationTime).toLocaleString('bg-BG')}</p>
                    <p>Last login: {new Date(authUser.metadata.lastSignInTime).toLocaleString('bg-BG')}</p>
                </div>
                <PasswordChangeForm />
            </div>
        }
    </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);