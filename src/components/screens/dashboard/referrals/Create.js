import React, { useEffect, useState, Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Switch } from '@headlessui/react';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline';
import Map from "./../Map";
import { GetAllClients } from './../../../../helpers/apis/Client';
import { GetAllCompanies } from './../../../../helpers/apis/Company';
import { GetAdminCompanies } from './../../../../helpers/apis/Admin';
import { GetAllDrivers } from './../../../../helpers/apis/Driver';
import { CreateReferral } from './../../../../helpers/apis/Referral';

const Create = () => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    };

    const rol = useSelector(state => state.auth.user.role);
    const id = useSelector(state => state.auth.user.id);
    const mapRef = useRef();
    const navigation = useHistory();
    const [referral, setReferral] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [address, setAddress] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [driver, setDriver] = useState('');
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState('');
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState('');
    const [date, setDate] = useState('');
    const [line, setLine] = useState('');
    const [executive, setExecutive] = useState('');
    const [msgE, setMessage] = useState('');
    const [ok, setOk] = useState(false);
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [request, setRequest] = useState('');

    const changeValues = (object) => {
        setLat(object.lat);
        setLng(object.long);
    };

    const Request = (e) => {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
        }
    };

    const save = async (e) => {
        e.preventDefault();
        if (referral == "" || driver == "" || client == "" || company == "" || date == "" || line == "" || address == "") {
            setEmpty(true);
        } else {
            let object;
            if (enabled && lat != "" && lng != "") {
                object = {
                    referral: referral,
                    driver: driver,
                    company: company,
                    client: client,
                    line: line,
                    executive: executive,
                    date: date,
                    flag: 1,
                    request: request,
                    lat: lat,
                    long: lng,
                    address: address
                };
            } else {
                object = {
                    referral: referral,
                    driver: driver,
                    company: company,
                    client: client,
                    line: line,
                    executive: executive,
                    date: date,
                    flag: 0,
                    request: 0,
                    lat: 0,
                    long: 0,
                    address: address
                };
            }
            const response = await CreateReferral(object);
            if (response.statusCode == 200) {
                setOk(true);
            } else if (response.statusCode == 409) {
                setMessage("Existe una remisión  con este número asignado")
                setError(true);
            }
            else {
                setMessage(" Ocurrió un error al intentar guardar la remisión, contacte al soporte técnico")
                setError(true);
            }
        }
    };

    useEffect(() => {
        if (rol == 1) {
            const request = async () => {
                const response = await GetAllDrivers();
                if (response.data.length > 0) {
                    let arrayDrivers = [];
                    response.data.forEach(d => {
                        if (d.User.active == 1) {
                            arrayDrivers.push(d)
                        }
                    });
                    setLine(arrayDrivers[0].transportLine);
                    setDrivers(arrayDrivers);
                    setDriver(arrayDrivers[0].UserId)
                }
                const responseClient = await GetAllClients();
                if (responseClient.data.length > 0) {
                    let arrayClients = [];
                    responseClient.data.forEach(c => {
                        if (c.active == 1) {
                            arrayClients.push(c)
                        }
                    });
                    setClient(arrayClients[0].id);
                    setClients(arrayClients);
                }
                const responseCompany = await GetAllCompanies();
                if (responseCompany.data.length > 0) {
                    let arrayCompanies = [];
                    responseCompany.data.forEach(c => {
                        if (c.active == 1) {
                            arrayCompanies.push(c)
                        }
                    });
                    setCompany(arrayCompanies[0].id);
                    setCompanies(arrayCompanies);
                }
            };
            request();
        } else if (rol == 3) {
            const request = async () => {
                const response = await GetAllDrivers();
                if (response.data.length > 0) {
                    let arrayDrivers = [];
                    response.data.forEach(d => {
                        if (d.User.active == 1) {
                            arrayDrivers.push(d)
                        }
                    });
                    setDrivers(arrayDrivers);
                    setDriver(arrayDrivers[0].UserId);
                    setLine(arrayDrivers[0].transportLine)
                }
                const responseClient = await GetAllClients();
                if (responseClient.data.length > 0) {
                    let arrayClients = [];
                    responseClient.data.forEach(c => {
                        if (c.active == 1) {
                            arrayClients.push(c)
                        }
                    });
                    setClient(arrayClients[0].id);
                    setClients(arrayClients);
                }
                const responseCompany = await GetAdminCompanies(id);
                if (responseCompany.data != null && responseCompany.data.length > 0) {
                    let arrayCompanies = [];
                    responseCompany.data.forEach(c => {
                        if (c.Company.active == 1) {
                            arrayCompanies.push(c)
                        }
                    });
                    setCompany(arrayCompanies[0].Company.id);
                    setCompanies(arrayCompanies);
                }
            };
            request();
        }
    }, []);

    const ChangeDriver = (e) => {
        e.preventDefault();
        setDriver(e.target.value);
        drivers.forEach(async d => {
            if (d.UserId == e.target.value) {
                setLine(d.transportLine);
            }
        });
    };

    return (
        <>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                <div className="mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <form className="space-y-8 divide-y divide-gray-200" onSubmit={save} >
                                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                        <div>
                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Nueva remisión</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                    Rellena la información para crear una nueva remisión
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Información de la remisión</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Ingresa los datos de la remisión</p>
                                            </div>
                                            <div className="space-y-6 sm:space-y-5">
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Sucursal
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                        <select
                                                            id="company"
                                                            name="company"
                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                            onChange={(e) => { setCompany(e.target.value) }}
                                                        >
                                                            {companies.map((company) => (
                                                                <option value={rol == 3 ? company.Company.id : company.id}> {rol == 3 ? company.Company.companyNumber + "-" + company.Company.fullname : company.companyNumber + "-" + company.fullname}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="referral_number" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Número de remisión
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="referral_number"
                                                            id="referral_number"
                                                            onChange={(e) => { setReferral(e.target.value); console.log(mapRef.current.state) }}
                                                            value={referral}
                                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="client" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Cliente
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                        <select
                                                            id="client"
                                                            name="client"
                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                            onChange={(e) => { setClient(e.target.value) }}
                                                        >
                                                            {clients.map((client) => (
                                                                <option value={client.id}> {client.codeClient + "-" + client.fullname}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="driver" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Conductor
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                        <select
                                                            id="driver"
                                                            name="driver"
                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                            onChange={(e) => { ChangeDriver(e) }}
                                                        >
                                                            {drivers.map((driver) => (
                                                                <option value={driver.UserId}> {driver.phone + "-" + driver.fullname}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="line" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Compañía de Transporte
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                        <input
                                                            id="line"
                                                            name="line"
                                                            type="text"
                                                            value={line}
                                                            onChange={(e) => { setLine(e.target.value.toUpperCase()) }}
                                                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="executive" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Ejecutivo de cobranza
                                                    </label>

                                                    <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                        <input
                                                            id="executive"
                                                            name="executive"
                                                            type="text"
                                                            onChange={(e) => { setExecutive(e.target.value.toUpperCase()) }}
                                                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Fecha Programada
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                        <input
                                                            id="date"
                                                            name="date"
                                                            type="date"
                                                            onChange={(e) => { setDate(e.target.value) }}
                                                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="lat" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Latitud
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                        <input
                                                            id="lat"
                                                            name="lat"
                                                            type="text"
                                                            value={lat}
                                                            readOnly
                                                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="lng" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Longitud
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                        <input
                                                            id="lng"
                                                            name="lng"
                                                            type="text"
                                                            readOnly
                                                            value={lng}
                                                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="flag" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Rastreo automático
                                                    </label>
                                                    <Switch.Group as="div" className="mt-1 sm:mt-0 sm:col-span-1">
                                                        <Switch
                                                            checked={enabled}
                                                            onChange={setEnabled}
                                                            className={classNames(
                                                                enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                            )}
                                                        >
                                                            <span className="sr-only">Use setting</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    enabled ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                    </Switch.Group>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5" >
                                                    <label htmlFor="request" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" >
                                                        Tiempo de respuesta (minutos)
                                                    </label>

                                                    <div className="mt-1 sm:mt-0 sm:col-span-1" >
                                                        <input
                                                            readOnly={!enabled}
                                                            id="request"
                                                            name="request"
                                                            type="text"
                                                            onKeyPress={(e) => { Request(e) }}
                                                            onChange={(e) => { setRequest(e.target.value) }}
                                                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Dirección de entrega
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <textarea
                                                            id="address"
                                                            name="address"
                                                            onChange={(e) => { setAddress(e.target.value.toUpperCase()) }}
                                                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5" >
                                                    <label htmlFor="map" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" >
                                                        Geolocalización
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-1" >
                                                        <Map
                                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCqKecPidNbJpzL3fTjkiWEtabjBVXqzUU&libraries=places"
                                                            loadingElement={<div style={{ height: `100%` }}>Cargando...</div>}
                                                            containerElement={<div style={{ height: '30vh', width: "100%" }} />}
                                                            mapElement={<div style={{ height: `100%`, width: "100%" }} />}
                                                            ref={mapRef}
                                                            changeFunction={changeValues}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-5">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => {
                                                    navigation.push("/dashboard/referrals");
                                                }}
                                                type="button"
                                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Volver
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Transition.Root show={ok} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={ok} onClose={setOk}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Guardado exitoso!
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                La remisión ha sido creada con exito.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={async () => { await setOk(false); navigation.push('/dashboard/referrals'); }}
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={error} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={error} onClose={setError}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Error!
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {msgE}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={async () => { await setError(false); }}
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={empty} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={empty} onClose={setEmpty}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                                        <ExclamationIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Espera!
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Debes rellenar todos los campos para guardar
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={async () => { await setEmpty(false); }}
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default Create