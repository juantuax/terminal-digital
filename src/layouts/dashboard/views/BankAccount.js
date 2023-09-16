import React from 'react';
import { useParams } from 'react-router-dom';
import BankAccounts from '../../../components/screens/dashboard/bank-accounts/BankAccounts';
import Create from '../../../components/screens/dashboard/bank-accounts/Create';
import Update from '../../../components/screens/dashboard/bank-accounts/Update';

export const ReadBankAccounts = () => {
    return (
        <BankAccounts />
    );
};

export const CreateBankAccounts = () => {
    return (
        <Create />
    );
};

export const UpdateBankAccounts= () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};