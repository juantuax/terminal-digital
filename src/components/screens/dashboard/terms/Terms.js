import React, { useState, useEffect, } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import Pagination from '../../../component/Pagination';
import { GetAllTerms } from '../../../../helpers/apis/Terms';
import moment from 'moment';

const Terms = () => {
    const [term, setTerm] = useState([]);
    const [terms, setTerms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        const request = async () => {
            const response = await GetAllTerms();
            if (response.data.length > 0) {
                setTerms(response.data);
                setTerm(response.data);
                console.log(response.data);
            }
        };
        request();
    }, []);

    const Filter = (text) => {
        const result = terms.filter(item => item.Driver.fullname.includes(text) || item.Driver.phone.includes(text) || item.version.includes(text));
        if (result) {
            setTerm(result);
        }
    };

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = term.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Términos y condiciones</h3>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                    </div>
                </div>
            </div>

            <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Conductores registrados
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
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Nombre
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Teléfono
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Versión
                                                </th>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {term.map((person, personIdx) => (
                                                person.DriverId != null ?
                                                    <tr key={person.id} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.Driver.fullname}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.Driver.phone}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.version}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{moment(person.createdAt).format('DD-MM-YYYY')}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{moment(person.createdAt).format('HH:mm')}</td>
                                                    </tr> : ""
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        currentPage={currentPage}
                                        postsPerPage={postsPerPage}
                                        totalPosts={term.length}
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
    );
}

export default Terms;