import React from 'react';
import { useParams } from 'react-router-dom';
import Referral from '../../../components/screens/dashboard/referrals/Referrals';
import Create from '../../../components/screens/dashboard/referrals/Create';
import Update from '../../../components/screens/dashboard/referrals/Update';
import Gallery from '../../../components/screens/dashboard/referrals/Gallery';
import Switch from '../../../components/screens/dashboard/referrals/Switch';

export const ReadReferral = () => {
    return (
        <Referral />
    );
}
export const CreateReferral = () => {
    return (
        <Create />
    );
};
export const UpdateReferral = () => {
    let { id } = useParams();
    return (
        <Update id={id} />
    );
};

export const GalleryReferral = () => {
    let { id } = useParams();
    return (
        <Gallery id={id} />
    );
};

export const SwitchReferral = () => {
    let { id } = useParams();
    return (
        <Switch id={id} />
    );
};