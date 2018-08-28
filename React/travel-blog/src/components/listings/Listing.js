import React, { Component } from 'react';
import TravelItem from './TravelItem';
import { Link } from 'react-router-dom';
// import { database } from '../../../node_modules/firebase';

export default class Listing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listing: null
        }
        this._isMounted = false;
    }
    componentDidUpdate() {
        if (!this._isMounted) {
            this.formatListing(this.props.listingItems)
            this._isMounted = true;
        }
    }
    formatListing = (data) => {
        let travels = [];
        travels.push(Object.keys(data).map((i) => <TravelItem key={i} postId={i} data={data[i]} public={this.props.myList}/>).reverse())
        this.setState({listing: travels})
    }

    render() {
        return(

            <div>
                {this.state.listing}
            </div>
        )
    }
}