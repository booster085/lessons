import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
 
class Tiny extends Component {
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
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
            height: this.props.height || '150px'
            }}
            onChange={this.handleChange}
        />
        );
    }
};

export default Tiny;