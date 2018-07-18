import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions';
import Header from './components/Header';
import SignInForm from './components/forms/SignInForm';
import SignUpForm from './components/forms/SignUpForm';
import { SIGN_IN, SIGN_UP } from './constants/routes';

class App extends Component {
    constructor(props) {
        super(props)
        this.props.fetchUser;
    }
    render() {
        return (
            <BrowserRouter>
                <div className="wrapper">
                    <Header />
                    <div className="container">
                        <Route path={SIGN_IN} component={SignInForm}/>
                        <Route path={SIGN_UP} component={SignUpForm}/>
                        Main content
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, { fetchUser })(App);
