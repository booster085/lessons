import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SIGN_UP } from '../../constants/routes';

export default class SignInForm extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            form: {},
            errors: {},
            success: '',
            failed: ''
        }
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
    handleSubmit = (e) => {
        this.setState({
            errors: {},
            success: '',
            failed: ''
        })
        e.preventDefault();
        if (this.validateInput(this.state.form)) {
            fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Accept-Charset': 'utf-8'
                },
                body: JSON.stringify(this.state.form)
            })
            .then((data) => data.json())
            .then((res) => {
                console.log(res)
                if (!res.success && res.errors) {
                    this.setState({ errors: res.errors })
                } else if (!res.success) {
                    this.setState({ failed: res.message })
                } else {
                    this.setState({ success: res.message })
                    window.localStorage.setItem('jwt', res.token);
                    window.localStorage.setItem('username', res.user.name);
                    this.handleLogging(res.user.name)
                }
            })
            .catch(err => console.log(err))

        }
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
    handleLogging = (username) => {
        this.props.onLogged({username})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login form</h1>
                    <div className="success-text">{this.state.success || ''}</div>
                    <div className="error-text">{this.state.failed || ''}</div>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="email" type="email" className="form-control" placeholder="Enter email"/>
                        <div className="error-text">{this.state.errors.email || ''}</div>
                    </div>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="password" type="password" className="form-control" placeholder="Password"/>
                        <div className="error-text">{this.state.errors.password || ''}</div>
                    </div>
                    <button type="submit" className="btn btn-info float-right">Sign in</button>
                </form>
                <div className="create-account-btn">
                    <p>Don't have an account?</p>
                    <Link to={SIGN_UP} className="btn btn-success">Sign up</Link>
                </div>
            </div>
        )
    }
}