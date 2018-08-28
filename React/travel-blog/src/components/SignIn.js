import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
    <div>
        <h2>SignIn</h2>
        <SignInForm history={history} />
        <PasswordForgetLink />
        <SignUpLink />
    </div>

const INITIAL_STATE = {
    form: {
        email: '',
        password: ''
    },
    errors: {},
    failed: ''
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }
    handleChange = (e) => {
        const element = {
            name: e.target.name,
            value: e.target.value
        }
        this.setState(prevState => {
            prevState.form[element.name] = element.value
            return { form: prevState.form }
        })
    }
    setErrors = (field, msg) => {
        this.setState(prevState => {
            prevState.errors[field] = msg
            return { errors: prevState.errors }
        })
    }
    validateInput = (payload) => {
        let isFormValid = true
        if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
            isFormValid = false
            this.setErrors('email', 'Please provide your email address')
        }

        if (typeof payload.password !== 'string' || payload.password.trim().length === 0) {
            isFormValid = false
            this.setErrors('password', 'Please provide your password')
        }
        return isFormValid
    }

    onSubmit = (event) => {
        const {
            form
        } = this.state;
        this.setState({errors: {}, failed: null });
        const {
            history,
        } = this.props;
        event.preventDefault();
        if(this.validateInput(this.state.form)) {
            this.setState({ ...INITIAL_STATE });
            auth.doSignInWithEmailAndPassword(form.email, form.password)
                .then(() => {
                    history.push(routes.HOME);
                })
                .catch(error => {
                    this.setState({failed: error.message});
                });
    
        }
    }

    render() {
        const {
            form
        } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="error-text">{this.state.failed || ''}</div>
                <div className="form-group">
                    <input
                        className="form-control"
                        value={form.email}
                        onChange={this.handleChange} name="email"
                        type="email"
                        placeholder="Email Address"
                    />
                    <div className="error-text">{this.state.errors.email || ''}</div>
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        value={form.password}
                        onChange={this.handleChange} name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <div className="error-text">{this.state.errors.password || ''}</div>
                </div>
                <button className="btn btn-info float-right" type="submit">Submit</button>
            </form>
        );
    }
}

const SignInLink = () =>
    <p>
        Allready have an account?
        {' '}
        <Link to={routes.SIGN_IN}>Sign In</Link>
    </p>

export default withRouter(SignInPage);

export {
    SignInForm,
    SignInLink
};