import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { passwordOne, passwordTwo } = this.state;
        this.setState({error: null });
        if (passwordOne === passwordTwo && passwordOne.trim().length >= 6) {
            auth.doPasswordUpdate(passwordOne).then(() => {
                    this.setState({ ...INITIAL_STATE });
                })
                .catch(error => {
                    this.setState(byPropKey('error', error));
                });
        } else {
            this.setState({error: 'Two passwords must be equal and more than 6 characters'});
        }
    }

    render() {
        const {
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        return (
            <div className="col-md-6">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            value={passwordOne}
                            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                            type="password"
                            placeholder="New Password"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            value={passwordTwo}
                            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                            type="password"
                            placeholder="Confirm New Password"
                        />
                    </div>
                    <button className="btn btn-info float-right" type="submit">Change Password</button>

                    {error && <p>{error.message}</p>}
                    <div className="error-text">{this.state.error || ''}</div>
                </form>
            </div>
        );
    }
}
const PasswordChangeLink = () =>
    <p>
        <Link to="/pw-change">Change Password?</Link>
    </p>

export default PasswordChangeForm;
export {
    PasswordChangeForm,
    PasswordChangeLink
};