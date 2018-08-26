import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tiny from './fields/TinyMCE';

import { auth, db, storage } from '../firebase';
import * as routes from '../constants/routes';

const AddTravelPage = ({history}) =>
  <div>
    <h1>Add travel to your diary</h1>
    <AddTravelForm history={history} />
  </div>

const INITIAL_STATE = {
    form: {title: ''},
    errors: {},
    failed: ''
};

class AddTravelForm extends Component {
    constructor(props) {
      super(props);
      this._isMounted = false;
      this.state = { ...INITIAL_STATE }
    }
    
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (e) => {
        const element = {
            name: e.target.name,
            value: e.target.value
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
        if (typeof payload.short !== 'string' || payload.short.replace(/(<([^>]+)>)/ig,"").trim().length <= 10 || payload.short.replace(/(<([^>]+)>)/ig,"").trim().length > 100) {
            isFormValid = false
            this.setErrors('short', 'Text must be between 10 and 100 chars')
        }
        if (typeof payload.description !== 'string' || payload.description.replace(/(<([^>]+)>)/ig,"").trim().length <= 50) {
            isFormValid = false
            this.setErrors('short', 'Description must be at least 50 chars')
        }
        return isFormValid
    }
    onSubmit = (event) => {
        const {
            form
        } = this.state;
        this.setState({errors: {}, failed: null });
        const {
            history
        } = this.props;
        event.preventDefault();

        if(this.validateInput(this.state.form)) {
            if (this._isMounted) {
                this.setState({ ...INITIAL_STATE });
            }
            console.log(form);
            //TODO images input return only one filename
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
                            <div className="error-text">{this.state.errors.title || ''}</div>
                    </div>
                    <div className="form-group">
                        {/* <textarea rows="3"
                            className="form-control"
                            value={form.short}
                            name="text"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Short description"
                        ></textarea>
                        <div className="error-text">{this.state.errors.short || ''}</div> */}
                        <p>Short description</p>
                        <Tiny handleEditorChange={this.handleChange} name='short'/>
                    </div>
                    <div className="form-group">
                        {/* <textarea rows="10"
                            className="form-control"
                            value={form.description}
                            name="description"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Description"
                        ></textarea>
                        <div className="error-text">{this.state.errors.description || ''}</div> */}
                        <p>Description</p>
                        <Tiny handleEditorChange={this.handleChange} name='description'/>
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
                        <div className="error-text">{this.state.errors.images || ''}</div>
                    </div>
                    <button className="btn btn-info" type="submit">Save</button>
                </form>
            </div>
        );
    }
  }
  
  export default withRouter(AddTravelPage);
  
  export { AddTravelForm };