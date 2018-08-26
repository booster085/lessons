import React from 'react';
import Listing from './listings/Listing';
import withAuthorization from './withAuthorization';
import AuthUserContext from './AuthUserContext';

const HomePage = () =>
    <div>
        <div>
            <h1>All Travels</h1>
        </div>
        <div className="listing travel-listing">
            <Listing />
        </div>
    </div>

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(HomePage);