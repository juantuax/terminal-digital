import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate, indexLast, indexFirst }) => {
    const pageNumbers = [];
    const pageShowing = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    };

    if (pageNumbers.length > 0) {
        for (let index = currentPage; (index <= currentPage + 4) && (index < pageNumbers.length); index++) {
            pageShowing.push(index);
        };
    };

    const Forward = () => {
        if (currentPage < pageNumbers.length) {
            let number = currentPage + 1;
            paginate(number);
        }
    }

    const Backward = () => {
        if (currentPage > 1) {
            let number = currentPage - 1;
            paginate(number);
        }
    }

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={Backward}
                >
                    Previous
                </button>
                <button
                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={Forward}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{`${indexFirst}`}</span> a <span className="font-medium">{`${indexLast}`}</span> de{' '}
                        <span className="font-medium">{`${totalPosts}`}</span> resultados
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={Backward}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {/* {pageShowing.map((number, index) => {
                            if (number === currentPage) {
                                return (
                                    <button
                                        aria-current="page"
                                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        key={index}
                                        onClick={() => { paginate(number) }}>
                                        {number}
                                    </button>
                                )
                            } else {
                                return (
                                    <button
                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        key={index}
                                        onClick={() => { paginate(number) }}>
                                        {number}
                                    </button>
                                )
                            }
                        })} */}
                        <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            {`${currentPage} DE ${pageNumbers.length}`}
                        </button>
                        <button
                            onClick={Forward}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination;