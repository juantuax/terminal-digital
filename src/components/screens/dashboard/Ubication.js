import React, { useRef } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';


const Ubication = (props) => {

    const mapRef = useRef();
    return (
        <div>
            <GoogleMap
                defaultZoom={12}
                center={{ lat: props.latitude, lng: props.longitude }}
                ref= {mapRef}
                
            >
                <Marker
                    position={{ lat: props.latitude, lng: props.longitude }}
                />
            </GoogleMap>
        </div>
    );
}
export default withScriptjs(
    withGoogleMap(Ubication)
);
