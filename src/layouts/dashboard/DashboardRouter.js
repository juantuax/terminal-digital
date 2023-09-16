import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { ReadMain } from './views/Main';
import { ReadVersions, CreateVersions, UpdateVersions } from './views/Version';
import { ReadDrivers, CreateDrivers, UpdateDrivers } from './views/Driver';
import { CreateRoots, ReadRoots, UpdateRoots } from './views/Root';
import { CreateAdmins, ReadAdmins, UpdateAdmins } from './views/Admin';
import { CreateClients, ReadClients, UpdateClients } from './views/Client';
import { CreateCompanies, ReadCompanies, UpdateCompanies } from './views/Company';
import { ReadReferral, CreateReferral, UpdateReferral, GalleryReferral, SwitchReferral } from './views/Referral';
import { ReadAutomatic, MapAutomatic } from './views/Automatic';
import { ReadTerms } from './views/Terms';
import { CreateHelpers, ReadHelpers, UpdateHelpers } from './views/Helper';
import { ReadSessions } from './views/Session';
import { CreateBankAccounts, ReadBankAccounts, UpdateBankAccounts } from './views/BankAccount';
import { ApprovePayments, CreatePayments, ReadPayments, RejectPayments, UpdatePayments } from './views/Payment';
import Profile from '../../components/screens/dashboard/profiles/Profile';


const DashboardRouter = ({ match: { url } }) => (
    <Switch>
        <Route path={`${url}`} exact component={ReadMain} />
        <Route path={`${url}/drivers`} exact component={ReadDrivers} />
        <Route path={`${url}/profile`} exact component={Profile} />
        <Route path={`${url}/drivers/new`} exact component={CreateDrivers} />
        <Route path={`${url}/drivers/:id`} exact component={UpdateDrivers} />
        <Route path={`${url}/helpers`} exact component={ReadHelpers} />
        <Route path={`${url}/helpers/new`} exact component={CreateHelpers} />
        <Route path={`${url}/helpers/:id`} exact component={UpdateHelpers} />
        <Route path={`${url}/bank-accounts`} exact component={ReadBankAccounts} />
        <Route path={`${url}/bank-accounts/new`} exact component={CreateBankAccounts} />
        <Route path={`${url}/bank-accounts/:id`} exact component={UpdateBankAccounts} />
        <Route path={`${url}/payments/new`} exact component={CreatePayments} />
        <Route path={`${url}/payments/:id`} exact component={UpdatePayments} />
        <Route path={`${url}/payments/approve/:id`} exact component={ApprovePayments} />
        <Route path={`${url}/payments/reject/:id`} exact component={RejectPayments} />
        <Route path={`${url}/payments`} exact component={ReadPayments} />
        <Route path={`${url}/roots`} exact component={ReadRoots} />
        <Route path={`${url}/sessions`} exact component={ReadSessions} />
        <Route path={`${url}/roots/new`} exact component={CreateRoots} />
        <Route path={`${url}/roots/:id`} exact component={UpdateRoots} />
        <Route path={`${url}/administrators`} exact component={ReadAdmins} />
        <Route path={`${url}/administrators/new`} exact component={CreateAdmins} />
        <Route path={`${url}/administrators/:id`} exact component={UpdateAdmins} />
        <Route path={`${url}/clients`} exact component={ReadClients} />
        <Route path={`${url}/clients/new`} exact component={CreateClients} />
        <Route path={`${url}/clients/:id`} exact component={UpdateClients} />
        <Route path={`${url}/companies`} exact component={ReadCompanies} />
        <Route path={`${url}/companies/new`} exact component={CreateCompanies} />
        <Route path={`${url}/companies/:id`} exact component={UpdateCompanies} />
        <Route path={`${url}/referrals`} exact component={ReadReferral} />
        <Route path={`${url}/referrals/new`} exact component={CreateReferral} />
        <Route path={`${url}/referrals/:id`} exact component={UpdateReferral} />
        <Route path={`${url}/referrals/gallery/:id`} exact component={GalleryReferral} />
        <Route path={`${url}/referrals/switch/:id`} exact component={SwitchReferral} />
        <Route path={`${url}/automatic`} exact component={ReadAutomatic} />
        <Route path={`${url}/automatic/map/:id`} exact component={MapAutomatic} />
        <Route path={`${url}/version`} exact component={ReadVersions} />
        <Route path={`${url}/version/new`} exact component={CreateVersions} />
        <Route path={`${url}/version/:id`} exact component={UpdateVersions} />
        <Route path={`${url}/terms`} exact component={ReadTerms} />        
        <Redirect to="/dashboard" />
    </Switch>
);

export default withRouter(DashboardRouter);