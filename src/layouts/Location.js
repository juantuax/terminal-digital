import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { SocketContext } from '../context/Socket';
import Tracking from '../components/screens/dashboard/Tracking';
import { GetOneReferral } from '../helpers/apis/Referral';
import { GetUserWebLocation, RequestLocation } from '../helpers/apis/Location';
import moment from 'moment';

const Location = () => {
    const navigation = useHistory();
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [latc, setLatC] = useState('');
    const [lngc, setLngC] = useState('');
    const [referral, setReferral] = useState(null);
    const [referralid, setReferralId] = useState('');
    const [driver, setDriver] = useState('');
    const [number, setNumber] = useState('');
    const [binnacle, setBinnacle] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [marker, setMarker] = useState(false);
    const [directions, setDirections] = useState([]);
    const socket = useContext(SocketContext);
    const { id } = useParams();
    let indexColor = 0;

    const locationCreate = useCallback(async (data) => {
        if (referral !== null) {
            if (parseInt(data) === referral.id) {
                const obj = {
                    driver: driver,
                    referral: referral.id
                };
                const response = await GetUserWebLocation(obj);
                if (response.statusCode == 200) {
                    setBinnacle(response.data);

                    response.data.forEach(a => {
                        if (indexColor < a.id) {
                            indexColor = a.id
                        }
                    });
                }
            };
        };
    }, []);

    const locationRefresh = useCallback(async (data) => {
        if (data) {
            const obj = {
                driver: data.driver,
                referral: data.referral
            };
            const response = await GetUserWebLocation(obj);
            if (response.statusCode == 200) {
                setBinnacle(response.data);
                response.data.forEach(a => {
                    if (indexColor < a.id) {
                        indexColor = a.id
                    }
                });
            };
        };
    }, []);

    useEffect(() => {
        const request = async () => {
            const responseReferral = await GetOneReferral(id);
            if (responseReferral.statusCode == 200) {
                setLat(responseReferral.data.latitude);
                setLng(responseReferral.data.longitude);
                setNumber(responseReferral.data.referralNumber);
                setDriver(responseReferral.data.DriverId);
                setReferralId(responseReferral.data.id);
                setReferral(responseReferral.data);
                const obj = {
                    driver: responseReferral.data.DriverId,
                    referral: responseReferral.data.id
                };
                const response = await GetUserWebLocation(obj)
                if (response.statusCode == 200) {
                    setBinnacle(response.data);
                    response.data.forEach(a => {
                        if (indexColor < a.id) {
                            indexColor = a.id
                        }
                    });
                }
            }
        };
        request();
    }, []);

    useEffect(() => {
        socket.on('location_create', locationCreate);

        return () => {
            socket.off('location_create', locationCreate);
        }
    }, []);

    useEffect(() => {
        socket.on('location_refresh', locationRefresh);

        return () => {
            socket.off('location_refresh', locationRefresh);
        }
    }, []);

    const Location = async () => {
        const obj = {
            driver: driver,
            referral: referralid
        };
        await RequestLocation(obj);
    };

    const Route = async () => {
        const obj = {
            driver: driver,
            referral: referralid
        };
        const response = await GetUserWebLocation(obj)
        if (response.statusCode == 200) {
            if (response.data !== null) {
                setMarkers(response.data);
                let arrayTmp = [];
                for (let index = 0; index < response.data.length - 1; index++) {
                    const obj = {
                        lat: response.data[index].latitude,
                        lng: response.data[index].longitude
                    };
                    arrayTmp.push(obj);
                };
                if (response.data.length > 0) {
                    setLatC(response.data[0].latitude);
                    setLngC(response.data[0].longitude);
                    setLat(response.data[0].latitude);
                    setLng(response.data[0].longitude);
                }
                setDirections(arrayTmp);
            }
        }
    };

    const handleClick = (marker, event) => {
        setMarker(marker);
    };

    const CloseClick = (marker, event) => {
        setMarker(false);
    };

    return (
        <>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                <div className="mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <form className="space-y-8 divide-y divide-gray-200"  >
                                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                        <div>
                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900 flex justify-end">
                                                    Remisión : {number}
                                                </h3>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Revisar ubicación</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                    Consulta la información acerca de la ubicación del conductor
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-6 sm:space-y-5">
                                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5" >
                                                <div className="mt-1 sm:mt-0 sm:col-span-3" >
                                                    <div style={{ height: '50vh', width: '100%' }}>
                                                        <Tracking
                                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCqKecPidNbJpzL3fTjkiWEtabjBVXqzUU&libraries=places"
                                                            loadingElement={<div style={{ height: `100%` }}>Cargando...</div>}
                                                            containerElement={<div style={{ height: '50vh', width: "100%" }} />}
                                                            mapElement={<div style={{ height: `100%`, width: "100%" }} />}
                                                            latitude={lat}
                                                            longitude={lng}
                                                            centerLat={latc}
                                                            centerLng={lngc}
                                                            markers={markers}
                                                            directions={directions}
                                                            selectedMarker={marker}
                                                            onClick={handleClick}
                                                            CloseClick={CloseClick}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-5">
                                                <div className="flex justify-end">
                                                    <button
                                                        style={{ marginRight: 10 }}
                                                        onClick={async (e) => {
                                                            e.preventDefault();
                                                            await Route();
                                                        }}
                                                        type="button"
                                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Mostrar Ruta
                                                    </button>
                                                    <button
                                                        onClick={async (e) => {
                                                            e.preventDefault();
                                                            await Location();
                                                        }}
                                                        type="button"
                                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Ubicar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Fecha
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Hora
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Latitud
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Longitud
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {binnacle.map((person, personIdx) => (
                                                        <tr key={person.id} className={personIdx != indexColor ? personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50' : 'bg-green-100'}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{moment.utc(person.createdAt).format('DD-MM-YYYY')}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{moment.utc(person.createdAt).format('hh:mm A')}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.latitude}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.longitude}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <Link
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setMarkers([]);
                                                                        setMarker([]);
                                                                        setDirections([]);
                                                                        setLat(person.latitude);
                                                                        setLng(person.longitude);
                                                                        setLatC(person.latitude);
                                                                        setLngC(person.longitude)
                                                                    }} className="text-indigo-600 hover:text-indigo-900">
                                                                    Ver punto en mapa
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="pt-5">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => { navigation.push("/dashboard/referrals") }}
                                                type="button"
                                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Volver
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Location;