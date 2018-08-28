import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Tiny from './fields/TinyMCE';
import AuthUserContext from './AuthUserContext';
import Spinner from './visualComponents/Spinner';

import { db } from '../firebase';
import * as routes from '../constants/routes';

const AddTravelPage = ({history}) =>
  <div>
    <h2>Add travel to your diary</h2>
    <AuthUserContext.Consumer>
        {authUser => <AddTravelForm history={history} user={authUser}/>}
    </AuthUserContext.Consumer>
  </div>

const INITIAL_STATE = {
    form: {title: ''},
    errors: {},
    failed: null,
    fetchInProgress: false
};

class AddTravelForm extends Component {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE }
    }

    handleChange = (e) => {
        const element = {
            name: e.target.name,
            value: e.target.value
        }
        if (e.target.type === 'file') {
            element.value = e.target.files
        }
        this.setState(prevState => {
            prevState.form[element.name] = element.value
            return { form: prevState.form }
        })
    }

    setErrors = (field, msg) => {
        this.setState(prevState => {
            prevState.errors[field] = msg
            return { errors: prevState.errors }
        })
    }
    validateInput = (payload) => {
        let isFormValid = true
        if (!payload) { this.setState({failed: 'data missing'}); return false; }
        
        if (typeof payload.title !== 'string' || payload.title.trim().length === 0) {
            isFormValid = false
            this.setErrors('title', 'Enter title.')
        }
        if (typeof payload.short !== 'string' || payload.short.replace(/(<([^>]+)>)/ig,"").trim().length <= 10 || payload.short.replace(/(<([^>]+)>)/ig,"").trim().length > 200) {
            isFormValid = false
            this.setErrors('short', 'Text must be between 10 and 200 chars')
        }
        if (typeof payload.description !== 'string' || payload.description.replace(/(<([^>]+)>)/ig,"").trim().length <= 50) {
            isFormValid = false
            this.setErrors('description', 'Description must be at least 50 chars')
        }
        if (payload.images && typeof payload.images === 'object') {
            let images = payload.images;
            Object.keys(images).forEach(i => {
                if (images[i].type !== 'image/jpeg' && images[i].type !== 'image/png') {
                    isFormValid = false
                    this.setErrors('images', 'Format not allowed');
                    return;
                }
                if (parseInt(images[i].size, 10) > 2097152) {
                    isFormValid = false
                    this.setErrors('images', 'Image must be up to 2Mb');
                    return;
                }
                
            })
        }
        return isFormValid
    }
    onSubmit = (event) => {
        this.setState({errors: {}, failed: null, fetchInProgress: true});
        const {
            form
        } = this.state;
        const {
            history
        } = this.props;
        event.preventDefault();

        if(this.validateInput(this.state.form)) {
            db.doAddTravel(this.props.user, form.title, form.short, form.description, form.images)
                .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        history.push(routes.DIARY)
                })
                .catch(error => {
                    this.setState({failed: error.message});
                });
        } else {
            this.setState({fetchInProgress: false});
        }
    }
  
    render() {
        const {
            form
        } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="error-text">{this.state.failed || ''}</div>
                    <div className="form-group">
                        <p>Title</p>
                        <input
                            className="form-control"
                            value={this.state.form.title}
                            name="title"
                            onChange={this.handleChange}
                            type="text"
                            />
                            <p className="error-text">{this.state.errors.title || ''}</p>
                    </div>
                    <div className="form-group">
                        <p>Short description</p>
                        <Tiny handleEditorChange={this.handleChange} name='short'/>
                        <p className="error-text">{this.state.errors.short || ''}</p>
                    </div>
                    <div className="form-group">
                        <p>Description</p>
                        <Tiny handleEditorChange={this.handleChange} name='description' height='250px'/>
                        <p className="error-text">{this.state.errors.description || ''}</p>
                    </div>
                    <div className="form-group">
                        <p>Upload images</p>
                        <input
                            className="form-control"
                            name="images"
                            onChange={this.handleChange}
                            type="file"
                            placeholder="Upload images"
                            multiple
                        />
                        <p className="error-text">{this.state.errors.images || ''}</p>
                    </div>
                    <button className="btn btn-info" type="submit">Save</button>
                </form>
                {this.state.fetchInProgress ? <Spinner/> : null}
            </div>
        );
    }
  }
  
  export default withRouter(AddTravelPage);
  
  export { AddTravelForm };