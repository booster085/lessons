import React, { Component } from 'react';

import UsersList from './admin/UsersList';
import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class AdminPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: null
        }
    }
    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState({ users: snapshot.val() })
        )
    }
    render() {
        const { users } = this.state;
        return(
            <AuthUserContext.Consumer>
                {authUser =>
                    <div>
                        <h1>Admin</h1>
                        <p>Restricted area! Only users with the admin rule are authorized.</p>
                        <div className='usersList'>
                            {!!users && <UsersList {...users}/>}
                        </div>
                    </div>
                }
            </AuthUserContext.Consumer>
        )
    }
}
// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AdminPage);