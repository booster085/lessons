import React, { Component } from 'react';

import Listing from './listings/Listing';
import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import Spinner from './visualComponents/Spinner';
import { db } from '../firebase';

const MyTravelsPage = () =>
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                <div>
                    <h2>Account: {authUser.email}</h2>
                    <h3>My travel diary</h3>
                    <MyTravels user={authUser}/>
                </div>
            }
        </AuthUserContext.Consumer>
    </div>

class MyTravels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listing: null,
            fetchInProgress: true
        }
        db.onceGetUserTravels(this.props.user.uid).then(snapshot => {
            this.setState({listing: snapshot.val(), fetchInProgress: false})
        })
    }

    render() {
        return (
            <div className="listing travel-listing">
                {this.state.fetchInProgress ? <Spinner/> : null}
                {this.state.listing ? <Listing listingItems={this.state.listing} myList={true}/> : <h2 className='text-primary'>No travels added</h2>}
            </div>
        )
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(MyTravelsPage);