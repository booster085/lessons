import React, { Component } from 'react';
import Map from './fields/Map';
import * as config from '../constants/config';
import Spinner from './visualComponents/Spinner';

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetchInProgress: false
        }
    }

    render() {
        return (
            <div>
                {this.state.fetchInProgress ? <Spinner/> : null}
                <Map coords={config.CONTACTS_COORD}/>
                <div className="contact-info">
                    <div className="phone-block info">
                        <p className="phone">+359 700 14 220</p>
                    </div>
                    <div className="address-block info">
                        <div className="address">
                            <p>#15 Dobri Voinikov Str, Sofia 1504, Bulgaria<br/>
                                Phone: +359 2 9432 433; Fax: +359 2 9431 223<br/>
                                E-mail: <a href={'mailto:' + config.EMAIL}>{config.EMAIL}</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Contacts;