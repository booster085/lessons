import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import * as routes from '../constants/routes';

const Navigation = () =>
    <nav>
        <AuthUserContext.Consumer>
            { authUser => authUser
                ? <NavigationAuth /> 
                : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </nav>

const NavigationAuth = () =>
    <ul>

        <li><Link to={routes.LANDING}>Home</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><Link to={routes.HOME}>Аll travels</Link></li>
        <li><Link to={routes.DIARY}>My travels</Link></li>
        <li><Link to={routes.DIARY_ADD}>Add travel</Link></li>
        <li><Link to={routes.CONTACTS}>Contacts</Link></li>
    </ul>

const NavigationNonAuth = () =>
    <ul>
        <li><Link to={routes.LANDING}>Home</Link></li>
        <li><Link to={routes.CONTACTS}>Contacts</Link></li>
    </ul>

export default Navigation;