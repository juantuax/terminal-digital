import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { GetAllReferralsFlag, GetAllReferralsAdminFlag } from './../../../../helpers/apis/Referral';
import { GetAdminCompanies } from './../../../../helpers/apis/Admin';
import { GetAllCompanies } from './../../../../helpers/apis/Company';
import { GetAllDrivers } from './../../../../helpers/apis/Driver';
import { GetAllClients } from './../../../../helpers/apis/Client';

const Automatic = () => {
    const [referral, setReferral] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [filterCompany, setCompany] = useState([]);
    const [filterClient, setClient] = useState([]);
    const [filterDriver, setDriver] = useState([]);
    const [filterStatus, setStatus] = useState([]);
    const rol = useSelector(state => state.auth.user.role);
    const id = useSelector(state => state.auth.user.id);
    class myReferral {
        constructor(Company, Driver, status, dateIssue, transportLine, referralNumber, address, executive, Client, flag, id) {
            this.Company = Company;
            this.Driver = Driver;
            this.status = status;
            this.dateIssue = dateIssue;
            this.transportLine = transportLine;
            this.referralNumber = referralNumber;
            this.address = address;
            this.executive = executive;
            this.Client = Client;
            this.flag = flag;
            this.id = id
        }
    };

    useEffect(() => {
        const request = async () => {
            if (rol == 1) {
                const response = await GetAllReferralsFlag();
                if (response.statusCode == 200) {
                    setReferrals(response.data);
                    const result = response.data.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes("PENDIENTE"));
                    setReferral(result);
                };

                const driver = await GetAllDrivers()
                if (driver.statusCode == 200) {
                    setDriver(driver.data)
                };

                const client = await GetAllClients()
                if (client.statusCode == 200) {
                    setClient(client.data)
                };

                const company = await GetAllCompanies()
                if (company.statusCode == 200) {
                    setCompany(company.data)
                };
            } else if (rol == 3) {
                const response = await GetAdminCompanies(id)
                setCompany(response.data);
                if (response.statusCode == 200) {
                    let arrayReferrals = []
                    for (let i = 0; i < response.data.length; i++) {
                        const companies = await GetAllReferralsAdminFlag(response.data[i].CompanyId)
                        companies.data.forEach(c => {
                            if (companies.statusCode == 200 && c) {
                                const ref = new myReferral(c.Company, c.Driver, c.status, c.dateIssue, c.transportLine, c.referralNumber, c.address, c.executive, c.Client, c.flag, c.id)
                                arrayReferrals.push(ref);
                            }
                        });
                    };

                    const driver = await GetAllDrivers()
                    if (driver.statusCode == 200) {
                        setDriver(driver.data)
                    };

                    const client = await GetAllClients()
                    if (client.statusCode == 200) {
                        setClient(client.data)
                    };

                    const result = arrayReferrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes("PENDIENTE"));
                    setReferrals(arrayReferrals);
                    setReferral(result);
                }
            }
        };
        request();
    }, []);

    const FilterDriver = (text) => {
        if (text != "TODOS") {
            const result = referrals.filter(item => item.Driver.username.includes(text));
            if (result) {
                setReferral(result);
            }
        }
        else {
            setReferral(referrals);
        }
    };

    const FilterClient = (text) => {
        if (text != "TODOS") {
            const result = referrals.filter(item => item.Client.fullname.includes(text));
            if (result) {
                setReferral(result);
            }
        }
        else {
            setReferral(referrals);
        }
    };

    const FilterCompany = (text) => {
        if (text != "TODOS") {
            const result = referrals.filter(item => item.Company.fullname.includes(text));
            if (result) {
                setReferral(result);
            }
        }
        else {
            setReferral(referrals);
        }
    };

    const FilterStatus = (text) => {
        if (text != "TODOS") {
            const result = referrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes(text));
            if (result) {
                setReferral(result);
            }
        }
        else {
            setReferral(referrals);
        }
    };

    const Filter = (text) => {
        const result = referrals.filter(item => item.Client.fullname.includes(text) || item.Driver.username.includes(text) || item.transportLine.includes(text) || item.referralNumber.includes(text) || item.executive.includes(text) || item.Company.fullname.includes(text) || item.executive.includes(text) || item.dateIssue.includes(text) || (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes(text));
        if (result) {
            setReferral(result);
        }
    };

    return (
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
            {/* Page header */}
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Rastreo automático</h3>
                    </div>
                </div>
            </div>

            <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Remisiones registradas
            </h2>

            <div className="mt-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="flex-1 flex justify-center lg:ml-6 lg:justify-end">
                                    <div className="max-w-lg w-full lg:max-w-xs">
                                        <label htmlFor="search" className="sr-only">
                                            Buscar
                                        </label>
                                        <div className="relative text-gray-400 focus-within:text-gray-500">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="search"
                                                className="block w-full bg-white py-2 pl-10 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 focus:placeholder-gray-500 sm:text-sm"
                                                placeholder="Buscar"
                                                onChange={(e) => { Filter(e.target.value.toUpperCase()) }}
                                                type="search"
                                                name="search"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="flex-1 flex justify-center lg:ml-6 lg:justify-end" >
                                    <div className="max-w-lg w-full lg:max-w-xs" >
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            Filtrar por conductor
                                            <select
                                                id="driver"
                                                name="driver"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={(e) => { FilterDriver(e.target.value) }}
                                            >
                                                <option value="TODOS">TODOS</option>
                                                {filterDriver.map((driver) => (
                                                    <option value={driver.User.username}> {driver.User.username}</option>
                                                ))}
                                            </select>
                                        </p>
                                    </div>
                                    <div className="max-w-lg w-full lg:max-w-xs" style={{ marginLeft: 10 }}>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            Filtrar por cliente

                                            <select
                                                id="client"
                                                name="client"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={(e) => { FilterClient(e.target.value) }}
                                            >
                                                <option value="TODOS">TODOS</option>
                                                {filterClient.map((client) => (
                                                    <option value={client.fullname}> {client.fullname}</option>
                                                ))}
                                            </select>
                                        </p>
                                    </div>
                                    <div className="max-w-lg w-full lg:max-w-xs" style={{ marginLeft: 10 }}>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            Filtrar por sucursal
                                            <select
                                                id="company"
                                                name="company"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={(e) => { FilterCompany(e.target.value) }}
                                            >
                                                <option value="TODOS">TODOS</option>
                                                {filterCompany.map((company) => (
                                                    <option value={rol == 3 ? company.Company.fullname : company.fullname}> {rol == 3 ? company.Company.fullname : company.fullname}</option>
                                                ))}
                                            </select>
                                        </p>
                                    </div>
                                    <div className="max-w-lg w-full lg:max-w-xs" style={{ marginLeft: 10 }}>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            Filtrar por estado
                                            <select
                                                id="status"
                                                name="status"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={(e) => { FilterStatus(e.target.value) }}
                                            >
                                                <option value="TODOS">TODOS</option>
                                                <option value="PENDIENTE" selected={true}>PENDIENTE</option>
                                                <option value="FINALIZADA">FINALIZADA</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>
                                <br></br>
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Número de remisión
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Conductor
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Cliente
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Sucursal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Estado
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {referral.map((person, personIdx) => (
                                                <tr key={person.phone} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.referralNumber}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.Driver.username}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.Client.fullname}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.Company.fullname}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.status == 0 ? "PENDIENTE" : "FINALIZADO"}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link to={`/dashboard/automatic/map/${person.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                            Ubicar
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Automatic;