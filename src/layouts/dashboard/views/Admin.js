import React from 'react';
import { useParams } from 'react-router-dom';
import Administrators from '../../../components/screens/dashboard/administrators/Administrators';
import Create from '../../../components/screens/dashboard/administrators/Create';
import Update from '../../../components/screens/dashboard/administrators/Update';

export const ReadAdmins = () => {
    return (
        <Administrators />
    );
};

export const CreateAdmins = () => {
    return (
        <Create />
    );
};

export const UpdateAdmins = () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};