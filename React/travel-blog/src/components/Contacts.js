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
                <div class="contact-info">
                    <div class="phone-block info">
                        <p class="phone">+359 700 14 220</p>
                    </div>
                    <div class="address-block info">
                        <div class="address">
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