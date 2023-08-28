import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { GetAllVersions } from './../../../../helpers/apis/Version';
import { PencilAltIcon } from '@heroicons/react/outline';
import ReactTooltip from 'react-tooltip';

const Versions = () => {
    const [version, setVersion] = useState([]);
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        const request = async () => {
            const response = await GetAllVersions();
            if (response.statusCode == 200) {
                setVersions(response.data);
                setVersion(response.data);
            }
        };
        request();
    }, []);

    return (
        <>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="ml-4 mt-2">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Versiones</h3>
                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                            <Link
                                to="/dashboard/version/new"
                                type="button"
                                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Nueva
                            </Link>
                        </div>
                    </div>
                </div>

                <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                    Versiones registradas
                </h2>
                <div className="mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="flex-1 flex justify-center lg:ml-6 lg:justify-end">
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
                                                        Acción
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Número versión
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {version.map((person, personIdx) => (

                                                    <tr key={person.id} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <Link to={`/dashboard/version/${person.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                                <PencilAltIcon className="h-6 w-6" aria-hidden="true" data-tip="Editar" />
                                                                <ReactTooltip />
                                                            </Link>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">v{person.id}</td>
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
        </>
    );
}
export default Versions;