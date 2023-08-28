import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import usePlacesAutocomplete, { getLatLng, getGeocode } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';

const Map = (props) => {

    const mapRef = useRef();
    const [lat, setLat] = useState(props.latitude);
    const [long, setLong] = useState(props.longitude );
    const [latInit , setLatInit] = useState(19.4978);
    const [lngInit, setLngInit] = useState(-99.1269);

    useEffect(() => {
       
        const request = async () => {
            navigator.geolocation.getCurrentPosition(function(position){
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
                setLatInit(position.coords.latitude)
                console.log(position.coords.latitude)
                setLngInit(position.coords.longitude)} ,function(error){
                console.log(error)
          })
        };
        request();
    }, []);
    useEffect(() => {
       
      
    }, [lat,long]);

    const ClickMap = (e) => {
        setLat(e.latLng.lat());
        setLong(e.latLng.lng());
        setLngInit(e.latLng.lng());
        setLatInit(e.latLng.lat());
        const obj = {
           lat: e.latLng.lat(),
           long:e.latLng.lng()
        };
        props.changeFunction(obj);
    } 

 

    function Search() {
        const { ready, value, suggestions: { status, data }, setValue } = usePlacesAutocomplete({
            requestOptions: {
                location: { lat: () => latInit, lng: () => lngInit },
                radius: 200 * 10000
            }
        });
        return (
            <Combobox onSelect={async (address) => {
                try {
                    const results = await getGeocode({ address });
                    const { lat, lng } = await getLatLng(results[0]);
                    setLngInit(lng);
                    setLatInit(lat);
                    setLong(lng);
                    setLat(lat);
                    mapRef.current.panTo({ lat, lng });


                } catch (error) {
                    console.log(error)
                }
            }}>
                <ComboboxInput value={value} onChange={(e) => { setValue(e.target.value) }} className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" disabled={!ready} placeholder="Introduce tu dirección"></ComboboxInput>
                <ComboboxPopover>{status === "OK" && data.map(({ id, description }) => (<ComboboxOption key={id} value={description} ></ComboboxOption>))}</ComboboxPopover>
            </Combobox>
        )

    }
    return (
        <div>
            <Search />
            <GoogleMap
                defaultZoom={12}
                center={{ lat: latInit, lng: lngInit }}
                onClick={ClickMap}
                ref= {mapRef}
                
            >

                <Marker
                    position={{ lat: lat, lng: long }}

                />
            </GoogleMap>
        </div>
    );
}
export default withScriptjs(
    withGoogleMap(Map)
);
