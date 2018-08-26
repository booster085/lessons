import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SignInLink } from './SignIn';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({history}) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
    form: {},
    errors: {},
    failed: ''
};

class SignUpForm extends Component {
    constructor(props) {
      super(props);
      this._isMounted = false;
      this.state = { ...INITIAL_STATE }
    }
    
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        if (!payload || typeof payload.email !== 'string' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email))) {
            isFormValid = false
            this.setErrors('email', 'Please provide a correct email address.')
        }

        if (typeof payload.passwordOne !== 'string' || payload.passwordOne.trim().length < 6) {
            isFormValid = false
            this.setErrors('passwordOne', 'Password must have at least 6 characters.')
        }

        if (typeof payload.username !== 'string' || payload.username.trim().length === 0) {
            isFormValid = false
            this.setErrors('username', 'Please provide your name.')
        }
        if (payload.passwordTwo !== payload.passwordOne) {
            isFormValid = false
            this.setErrors('passwordTwo', 'Password confirmation must be the same as password')
        }
        return isFormValid
    }
    onSubmit = (event) => {
        const {
            form
        } = this.state;
        this.setState({errors: {}, failed: null });
        const {
            history
        } = this.props;
        event.preventDefault();

        if(this.validateInput(this.state.form)) {
            if (this._isMounted) {
                this.setState({ ...INITIAL_STATE });
            }
            auth.doCreateUserWithEmailAndPassword(form.email, form.passwordOne)
                .then(authUser => {
                    db.doCreateUser(authUser.user.uid, form.username, form.email)
                        .then(() => {
                            // if (this._isMounted) {
                            //     this.setState({ ...INITIAL_STATE });
                            // }
                            history.push(routes.HOME);
                        })
                        .catch(error => {
                            this.setState({failed: error.message});
                        })
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
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="error-text">{this.state.failed || ''}</div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            value={form.username}
                            name="username"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Full Name"
                            />
                            <div className="error-text">{this.state.errors.username || ''}</div>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            value={form.email}
                            name="email"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Email Address"
                        />
                        <div className="error-text">{this.state.errors.email || ''}</div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <input
                                className="form-control"
                                value={form.passwordOne}
                                name="passwordOne"
                                onChange={this.handleChange}
                                type="password"
                                placeholder="Password"
                            />
                            <div className="error-text">{this.state.errors.passwordOne || ''}</div>
                        </div>
                        <div className="col">
                            <input
                                className="form-control"
                                value={form.passwordTwo}
                                name="passwordTwo"
                                onChange={this.handleChange}
                                type="password"
                                placeholder="Confirm Password"
                            />
                            <div className="error-text">{this.state.errors.passwordTwo || ''}</div>
                        </div>
                    </div>
                    <button className="btn btn-info" type="submit">Sign Up</button>
                </form>
                <SignInLink/>
            </div>
        );
    }
  }
  
const SignUpLink = () =>
    <p>
        Don't have an account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  
  export default withRouter(SignUpPage);
  
  export {
    SignUpForm,
    SignUpLink,
  };