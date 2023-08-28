import React from 'react';
import { useParams } from 'react-router-dom';
import Automatic from '../../../components/screens/dashboard/automatic/Automatic';
import Map from '../../../components/screens/dashboard/automatic/Map';


export const ReadAutomatic = () => {
    return (
        <Automatic />
    );
}
export const MapAutomatic = () => {
    let { id } = useParams();
    return (
        <Map id={id} />
    );
};
