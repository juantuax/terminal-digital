import React from 'react';
import { useParams } from 'react-router-dom';
import Companies from '../../../components/screens/dashboard/companies/Companies';
import Create from '../../../components/screens/dashboard/companies/Create';
import Update from '../../../components/screens/dashboard/companies/Update';

export const ReadCompanies = () => {
    return (
        <Companies />
    );
};

export const CreateCompanies = () => {
    return (
        <Create />
    );
};

export const UpdateCompanies = () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};