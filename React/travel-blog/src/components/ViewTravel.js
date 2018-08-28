import React, { Component } from 'react';

import AuthUserContext from './AuthUserContext';
// import withAuthorization from './withAuthorization';
import Spinner from './visualComponents/Spinner';
import SingleTravel from './listings/SingleTravel';
import { db } from '../firebase';

const ViewTravelPage = ({match}) => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => <ViewTravel user={authUser} match={match}/>}
        </AuthUserContext.Consumer>
    </div>
)

class ViewTravel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            travel: null,
            result: null,
            fetchInProgress: true
        }
        this._isMounted = false;
        db.onceGetTravel(this.props.match.params.travel).then(snapshot => {
            this.setState({result: snapshot.val(), fetchInProgress: false})
        })
    }
    formatListing = (data) => {
        let travel = Object.keys(data).map((i) => <SingleTravel key={i} postId={i} data={data[i]}/>)
        this.setState({travel: travel})
    }
    componentDidUpdate() {
        if (!this._isMounted) {
            this.formatListing(this.state.result)
            this._isMounted = true;
        }
    }

    render() {
        return (
            <div className="single-travel-wrapper">
                <h1>Travel goes here</h1>
                {this.state.fetchInProgress ? <Spinner/> : null}
                {this.state.travel ? this.state.travel : null}
            </div>
        )
    }
}

// const authCondition = (authUser) => !!authUser;

export default ViewTravelPage;