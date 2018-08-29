import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../buttons/Button';
import { sanitizeInput } from '../helpers/Helper';

import * as routes from '../../constants/routes';

export default class TravelItem extends Component {
    
    handleDelete = () =>
        this.props.handleDelete(this.props.postId)

    render() {
        return(
            <div className="row">
                <div className="col-sm-8">
                    <div className="description-wrapper">
                        <h4 className="title">
                            <Link to={'diary/view/' + this.props.postId}>{sanitizeInput(this.props.data.title)}</Link>
                        </h4>
                        <div className="short-description" 
                            // TODO research for some better way
                            dangerouslySetInnerHTML={{ __html: this.props.data.short }}>
                        </div>
                    </div>
                </div> 
                <div className="col-sm-2 info">
                    <p className="date-added">{new Date(this.props.data.dateTime).toLocaleString('bg-BG')}</p>
                </div>
                <div className="col-sm-2 info">
                    {!this.props.public 
                        ? <p className="author"><a href="">{sanitizeInput(this.props.data.username)}</a></p>
                        :
                            <div className="manage-btns">
                                <Link to={routes.DIARY_EDIT} className="btn btn-warning">Edit</Link>
                                <Button btnClass="btn btn-danger" btnText="Delete" onClick={this.handleDelete}/>
                            </div>
                    }
                </div>
            </div>
        )
    }
}