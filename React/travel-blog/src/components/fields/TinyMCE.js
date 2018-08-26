import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';
 
export default class Tiny extends Component {
    constructor(props) {
        super(props)
    }
    handleChange = (e) => {
        e.target.name = this.props.name;
        e.target.value = e.target.getContent();
        this.props.handleEditorChange(e);
    }

    render() {
        return (
        <TinyMCE
            config={{
            plugins: 'autolink link image lists print preview',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
            }}
            onChange={this.handleChange}
        />
        );
    }
};