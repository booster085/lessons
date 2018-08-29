import React, { Component } from 'react';

import { sanitizeInput } from '../helpers/Helper';

export default class SingleTrave extends Component {

    render() {
        return(
            <div className="row">
                <div className="col-sm-12">
                    <div className="description-wrapper">
                        <h2 className="title">{sanitizeInput(this.props.data.title)}</h2>
                        {!this.props.public 
                            ? <p className="author"><a href="">{sanitizeInput(this.props.data.username)}</a></p>
                            : null
                        }
                        <div className="description" 
                            dangerouslySetInnerHTML={{ __html: this.props.data.description }}>
                        </div>
                        <div className="img-wrapper">
                            { this.props.data.images.map((url, i) => <img key={i} alt="" src={url}/>) }
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}