import React from 'react';
import { useParams } from 'react-router-dom';
import Drivers from '../../../components/screens/dashboard/drivers/Drivers';
import Create from '../../../components/screens/dashboard/drivers/Create';
import Update from '../../../components/screens/dashboard/drivers/Update';

export const ReadDrivers = () => {
    return (
        <Drivers />
    );
};

export const CreateDrivers = () => {
    return (
        <Create />
    );
};

export const UpdateDrivers = () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};