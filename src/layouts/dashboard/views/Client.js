import React from 'react';
import { useParams } from 'react-router-dom';
import Clients from '../../../components/screens/dashboard/clients/Clients';
import Create from '../../../components/screens/dashboard/clients/Create';
import Update from '../../../components/screens/dashboard/clients/Update';

export const ReadClients = () => {
    return (
        <Clients />
    );
};

export const CreateClients = () => {
    return (
        <Create />
    );
};

export const UpdateClients = () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};