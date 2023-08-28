import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon, PencilAltIcon } from '@heroicons/react/outline';
import Pagination from '../../../component/Pagination';
import { GetAllAdmins, DeleteAdmin } from '../../../../helpers/apis/Admin';
import ReactTooltip from 'react-tooltip';

const Administrators = () => {
    const [admin, setAdmin] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [adminId, setAdminId] = useState('');
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        const request = async () => {
            const response = await GetAllAdmins();
            if (response.statusCode == 200) {
                setAdmins(response.data);
                setAdmin(response.data);
            }
        };
        request();
    }, []);

    const Delete = async () => {
        const response = await DeleteAdmin(adminId)
        if (response.statusCode == 200) {
            const request = async () => {
                const response = await GetAllAdmins();
                if (response.statusCode == 200) {
                    setAdmins(response.data);
                    setAdmin(response.data);
                    setOpen(false)
                }
            };
            request();
        }
    };

    const Filter = (text) => {
        const result = admins.filter(item => item.companyNumber.includes(text) || item.fullname.includes(text) || item.phone.includes(text) || item.contact.includes(text) || item.address.includes(text));
        if (result) {
            setAdmin(result)
        }
    };

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = admin.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="ml-4 mt-2">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Terminales</h3>
                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                            <Link
                                to="/dashboard/administrators/new"
                                type="button"
                                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Nueva
                            </Link>
                        </div>
                    </div>
                </div>

                <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                    Terminales registradas
                </h2>
                <div className="mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="flex-1 flex justify-center lg:ml-6 lg:justify-end">
                                        <div className="max-w-lg w-full lg:max-w-xs" >
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Filtrar por data
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
                                                        name="search" />
                                                </div>
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
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Acción
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Número de Terminal
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Nombre
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Teléfono
                                                    </th>                                                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPosts.map((person, personIdx) => (
                                                    person.active == 1 ?
                                                        <tr key={person.phone} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            <td style={{ padding: 10 }} className="whitespace-nowrap">
                                                                <div className="relative flex flex-wrap items-center ">
                                                                    <Link style={{ marginLeft: 10 }} to={`/dashboard/administrators/${person.id}`} className="text-indigo-600 hover:text-indigo-900"><PencilAltIcon className="h-6 w-6" aria-hidden="true" data-tip="Consultar" />
                                                                        <ReactTooltip />
                                                                    </Link>
                                                                  
                                                                </div>
                                                            </td>
                                                            <td style={{ width: 200 }} className="px-6 py-4 text-sm font-medium text-gray-900">{person.companyNumber}</td>
                                                            <td style={{ maxWidth: 200 }} className="px-6 py-4  text-sm text-gray-500">{person.fullname}</td>
                                                            <td style={{ width: 200 }} className="px-6 py-4  text-sm text-gray-500">{person.phone}</td>
                                                        </tr>
                                                        :
                                                        <tr key={person.phone} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.companyNumber}</td>
                                                            <td style={{ width: 50 }} className="px-6 py-4  text-sm text-gray-500">{person.fullname}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.phone}</td>
                                                            

                                                        </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <Pagination
                                            currentPage={currentPage}
                                            postsPerPage={postsPerPage}
                                            totalPosts={admin.length}
                                            indexFirst={indexOfFirstPost}
                                            indexLast={indexOfLastPost}
                                            paginate={paginate}
                                        />
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

export default Administrators;