import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';

const PasswordForgetPage = () =>
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { email } = this.state;
        this.setState({ error: null });
        if (email.trim().length > 0) {
            auth.doPasswordReset(email)
                .then(() => {
                    this.setState({ ...INITIAL_STATE });
                })
                .catch(error => {
                    this.setState(byPropKey('error', error));
                });

        } else {
            this.setState({error: 'Email must not be empty'});
        }
    }
    render() {
        const {
            email,
            error,
        } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group row">
                    <input
                        className="form-control col-md-6"
                        value={this.state.email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
                    <button className="btn btn-info" type="submit">Reset My Password</button>
                </div>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

    const PasswordForgetLink = () =>
        <p>
            <Link to="/pw-forget">Forgot Password?</Link>
        </p>

    export default PasswordForgetPage;

export {
    PasswordForgetForm,
    PasswordForgetLink,
};