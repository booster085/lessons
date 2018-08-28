import React, { Component } from 'react';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
    
    handleChange = (e) => {
        e.target.name = this.props.name;
        e.target.value = e.target.getContent();
        this.props.handleEditorChange(e);
    }

    render() {
        const GoogleMapContact = withGoogleMap(props => (
            <GoogleMap
              defaultCenter = { this.props.coords }
              defaultZoom = { 13 }
            >
                <Marker position={ this.props.coords } />
            </GoogleMap>
         ));

        return (
         <div className="map-wrapper">
            <div id="map">
            <GoogleMapContact
                containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }
                mapElement={ <div style={{ height: `100%` }} /> }
            />
            </div>
         </div>
        );
    }
};

export default Map;