import React from 'react';
import { useParams } from 'react-router-dom';
import Helpers from '../../../components/screens/dashboard/helpers/Helpers';
import Create from '../../../components/screens/dashboard/helpers/Create';
import Update from '../../../components/screens/dashboard/helpers/Update';

export const ReadHelpers = () => {
    return (
        <Helpers />
    );
};

export const CreateHelpers = () => {
    return (
        <Create />
    );
};

export const UpdateHelpers = () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};