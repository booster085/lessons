import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions';

const INITIAL_STATE = {
    form: {},
    errors: {},
    success: '',
    failed: ''
}
class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {...INITIAL_STATE}
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

        if (typeof payload.password !== 'string' || payload.password.trim().length < 8) {
            isFormValid = false
            this.setErrors('password', 'Password must have at least 8 characters.')
        }

        if (typeof payload.name !== 'string' || payload.name.trim().length === 0) {
            isFormValid = false
            this.setErrors('name', 'Please provide your name.')
        }
        if (payload.emailConfirm !== payload.email) {
            isFormValid = false
            this.setErrors('emailConfirm', 'Email confirmation must be the same as email')
        }
        if (payload.passwordConfirm !== payload.password) {
            isFormValid = false
            this.setErrors('passwordConfirm', 'Password confirmation must be the same as password')
        }
        if (payload.terms !== 'on') {
            isFormValid = false
            this.setErrors('terms', 'You must agree with the terms')
        }
        return isFormValid
    }
    handleSubmit = (e) => {
        this.setState({
            errors: {},
            success: '',
            failed: ''})
        e.preventDefault();
        if (this.validateInput(this.state.form)) {
            let data = this.state.form;
            signUp(data.email, data.password)
            .then((authUser) => {
                this.setState(() => ({ ...INITIAL_STATE }));
            })
            .then((res) => {
                if (!res.success && res.errors) {
                    this.setState({ errors: res.errors })
                } else if (!res.success) {
                    this.setState({ failed: res.message })
                } else {
                    this.setState({ success: res.message })
                }
            })

        }
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign up</h1>
                    <div className="success-text">{this.state.success || ''}</div>
                    <div className="error-text">{this.state.failed || ''}</div>
                    <div className="form-group row">
                        <div className="col">
                            <input onChange={this.handleChange} name="email" type="email" className="form-control" placeholder="Enter email" />
                            <div className="error-text">{this.state.errors.email || ''}</div>
                        </div>
                        <div className="col">
                            <input onChange={this.handleChange} name="emailConfirm" type="email" className="form-control" placeholder="Confirm email" />
                            <div className="error-text">{this.state.errors.emailConfirm || ''}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="name" type="text" className="form-control" placeholder="Username" />
                        <div className="error-text">{this.state.errors.name || ''}</div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <input onChange={this.handleChange} name="password" type="password" className="form-control" placeholder="Password" />
                            <div className="error-text">{this.state.errors.password || ''}</div>
                        </div>
                        <div className="col">
                            <input onChange={this.handleChange} name="passwordConfirm" type="password" className="form-control" placeholder="Confirm Password" />
                            <div className="error-text">{this.state.errors.passwordConfirm || ''}</div>
                        </div>
                    </div>
                    <div className="form-check">
                        <input onChange={this.handleChange} name="terms" type="checkbox" className="form-check-input" id="terms" />
                        <label htmlFor="terms">I agree with the terms</label>
                        <div className="error-text">{this.state.errors.terms || ''}</div>
                    </div>
                    <button type="submit" className="btn btn-success float-right">Sign up</button>
                </form>
            </div>
        )
    }
}
// export default connect(mapStateToProps, { createUser })(Signup);

const mapStateToProps = ({ state }) => {
    return { state };
};

export default connect(mapStateToProps, { signUp })(SignUpForm);
