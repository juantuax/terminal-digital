import React, { useRef, useEffect } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, Circle, InfoWindow, Polyline } from 'react-google-maps';
import moment from 'moment';

const Tracking = (props) => {
    const mapRef = useRef();

    return (
        <div>
            {
                props.markers.length > 0 ?
                    <GoogleMap
                        defaultZoom={12}
                        center={{ lat: props.latitude, lng: props.longitude }}
                        ref={mapRef}>
                        {props.markers.map(marker => {
                            const onClick = props.onClick.bind(this, marker);
                            const onCloseClick = props.CloseClick.bind(this, marker);
                            return (
                                <Marker key={marker.id}
                                    onClick={onClick}
                                    position={{ lat: marker.latitude, lng: marker.longitude }}>
                                    {props.selectedMarker === marker &&
                                        <InfoWindow onCloseClick={onCloseClick}>
                                            <div>
                                                Fecha : {moment(marker.createdAt).format("YYYY-MM-DD")} Hora: {moment(marker.createdAt).format("HH:mm")}
                                            </div>
                                        </InfoWindow>}
                                </Marker>
                            );
                        })}

                        <Polyline
                            path={props.directions}
                            geodesic={true}
                            options={{
                                strokeColor: "#66009a",
                                strokeOpacity: 0.75,
                                strokeWeight: 2,
                            }}
                        />
                    </GoogleMap>
                    :
                    <GoogleMap
                        defaultZoom={12}
                        center={{ lat: props.latitude, lng: props.longitude }}
                        ref={mapRef}>
                        {
                            props.centerLat !== '' && props.centerLng !== '' &&
                            <Marker position={{ lat: props.centerLat, lng: props.centerLng }} />
                        }
                    </GoogleMap>
            }
        </div>
    );
}

export default withScriptjs(withGoogleMap(Tracking));