import React, { Component } from 'react';
import TravelItem from './TravelItem';

export default class Listing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listing: null
        }
    }
    handleDelete = (postId) => {
        this.setState(prevState => {
            let list = prevState.listing[0].length ? prevState.listing[0].filter((item) => item.key !== postId ) : null
            return { listing: list }
        })
        return this.props.handleDelete(postId)
    }
    componentDidMount() {
        this.formatListing(this.props.listingItems)
    }
    formatListing = (data) => {
        let travels = [];
        travels.push(Object.keys(data).map((i) => 
            <TravelItem handleDelete={this.handleDelete} key={i} postId={i} data={data[i]} public={this.props.myList}/>).reverse())
        this.setState({listing: travels})
    }

    render() {
        const { listing } = this.state;
        return(

            <div>
                {listing}
            </div>
        )
    }
}