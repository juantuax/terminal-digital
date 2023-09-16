import React from 'react';
import { useParams } from 'react-router-dom';
import Payments from '../../../components/screens/dashboard/payments/Payments';
import Create from '../../../components/screens/dashboard/payments/Create';
import Update from '../../../components/screens/dashboard/payments/Update';
import Approve from '../../../components/screens/dashboard/payments/Approve';
import Reject from '../../../components/screens/dashboard/payments/Reject';

export const ReadPayments = () => {
    return (
        <Payments />
    );
};

export const CreatePayments = () => {
    return (
        <Create />
    );
};

export const UpdatePayments= () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};
export const ApprovePayments= () => {
    let { id } = useParams();
    return (
        <Approve id={id} />
    );
};
export const RejectPayments= () => {
    let { id } = useParams();
    return (
        <Reject id={id} />
    );
};