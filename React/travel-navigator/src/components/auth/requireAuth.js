import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
    class Authentication extends Component {
        constructor(props) {
            super(props)
            if (this.props.authenticated === null) {
                this.context.router.history.push("/")
            }
        }
        static contextTypes = {
            router: PropTypes.object
        }

        getSnapshotBeforeUpdate(prevProps, prevState) {
            if (!prevProps.authenticated) {
                this.context.router.history.push("/");
              }
        }

        render() {
            if (this.props.authenticated) {
                return <ComposedComponent {...this.props} />
            }
            return null
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth }
    }

    return connect(mapStateToProps)(Authentication)
}