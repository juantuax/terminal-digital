import React from 'react';
import { useParams } from 'react-router-dom';
import Root from '../../../components/screens/dashboard/roots/Root';
import Create from '../../../components/screens/dashboard/roots/Create';
import Update from '../../../components/screens/dashboard/roots/Update';

export const ReadRoots = () => {
    return (
        <Root />
    );
};

export const CreateRoots = () => {
    return (
        <Create />
    );
};

export const UpdateRoots = () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};