import React from 'react';
import { useParams } from 'react-router-dom';
import Versions from '../../../components/screens/dashboard/versions/Versions';
import Create from '../../../components/screens/dashboard/versions/Create';
import Update from '../../../components/screens/dashboard/versions/Update';

export const ReadVersions = () => {
    return (
        <Versions />
    );
};

export const CreateVersions = () => {
    return (
        <Create />
    );
};

export const UpdateVersions = () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};