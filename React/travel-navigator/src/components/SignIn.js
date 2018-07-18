import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SIGN_IN } from '../constants/routes';

class SignIn extends Component {
    render() {
        return (
            <div className="signin-button-wrapper">
                <Link to={SIGN_IN} className="btn btn-info">Sign in</Link>
            </div>
        )
    }
    
}

export default SignIn;
