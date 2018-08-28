import React, { Component } from 'react';
import Listing from './listings/Listing';
import Spinner from './visualComponents/Spinner';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';

const HomePage = () =>
    <div>
        <div>
            <h2>All Users Travels</h2>
            <AllTravels/>
        </div>
    </div>

class AllTravels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listing: null,
            fetchInProgress: true
        }
        db.onceGetAllTravels().then(snapshot => {
            this.setState({listing: snapshot.val(), fetchInProgress: false})
        })
    }

    render() {
        const { listing, fetchInProgress } = this.state
        return (
            <div className="listing travel-listing">
                {fetchInProgress ? <Spinner/> : null}
                {!!listing ? <Listing listingItems={this.state.listing} /> : <h2 className='text-primary'>No travels to display</h2>}
            </div>
        )
    }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(HomePage);