import React, { Component } from 'react';
import { constants } from 'fs';
import { Link } from 'react-router-dom';
import Button from '../buttons/Button';
import { sanitizeInput } from '../helpers/Helper';

import * as routes from '../../constants/routes';

export default class SingleTrave extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="row">
                <div className="col-sm-12">
                    <div className="description-wrapper">
                        <h4 className="title">{sanitizeInput(this.props.data.title)}</h4>
                        {!this.props.public 
                            ? <p className="author"><a href="">{sanitizeInput(this.props.data.username)}</a></p>
                            : null
                        }
                        <div className="description" 
                            dangerouslySetInnerHTML={{ __html: this.props.data.description }}>
                        </div>
                        <div className="img-wrapper">
                            
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}