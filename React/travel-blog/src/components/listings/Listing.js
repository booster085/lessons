import React, { Component } from 'react';
import TravelItem from './TravelItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import * as routes from '../../constants/routes';

export default class Listing extends Component {
    constructor(props) {
        super(props)
    }
    getTravels = () => {
        let travels = [];
        if (!this.props.filter) {
            Array.from('teso', x => { 
                travels.push(<TravelItem key={x}/>)
            })
        }
        return travels;
    }

    render() {
        return(
            <Router>
                <div>
                    <Route exact path={routes.HOME} component={() => this.getTravels()}/>
                </div>
            </Router>

        )
    }
}