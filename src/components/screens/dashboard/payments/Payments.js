import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, PencilAltIcon,XCircleIcon,XIcon,CheckIcon } from "@heroicons/react/outline";
import Pagination from "../../../component/Pagination";
import {
  GetAllPayments,
  DeletePayment,
  GetAllPaymentsTerminal,
} from "../../../../helpers/apis/Payment";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";

const Payments = () => {
  const [Payment, setPayment] = useState([]);
  const [Payments, setPayments] = useState([]);
  const [PaymentId, setPaymentId] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const cancelButtonRef = useRef(null);
  const rol = useSelector((state) => state.auth.user.role);
  const id = useSelector((state) => state.auth.user.id);
  useEffect(() => {
    const request = async () => {
      if(rol == 1){
      const response = await GetAllPayments();
      if (response.statusCode == 200) {
        setPayments(response.data);
        setPayment(response.data);
      }
    } else{
      const response = await GetAllPaymentsTerminal(id);
      if (response.statusCode == 200) {
        setPayments(response.data);
        setPayment(response.data);
      }
    }
    };
    request();
  }, []);

  const Delete = async () => {
    const response = await DeletePayment(PaymentId);
    if (response.statusCode == 200) {
      const request = async () => {
        const response = await GetAllPayments();
        if (response.statusCode == 200) {
          setPayments(response.data);
          setPayment(response.data);
          setOpen(false);
        }
      };
      request();
    }
  };

  const Filter = (text) => {
    const result = Payments.filter(
      (item) =>
        item.dni.includes(text) ||
        item.ref_number.includes(text) ||
        item.fullname.includes(text) ||
        item.bank_emision.includes(text)
    );
    if (result) {
      setPayment(result);
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Payment.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Pagos
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <Link
                to="/dashboard/payments/new"
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Nuevo
              </Link>
            </div>
          </div>
        </div>

        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Pagos registrados
        </h2>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="flex-1 flex justify-center lg:ml-6 lg:justify-end">
                    <div className="max-w-lg w-full lg:max-w-xs">
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Filtrar por data
                        <label htmlFor="search" className="sr-only">
                          Buscar
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-500">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="search"
                            className="block w-full bg-white py-2 pl-10 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 focus:placeholder-gray-500 sm:text-sm"
                            placeholder="Buscar"
                            onChange={(e) => {
                              Filter(e.target.value.toUpperCase());
                            }}
                            type="search"
                            name="search"
                          />
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
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Acción
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Forma de Pago
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nombre del Titular
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Dni
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Monto
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Estado
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts.map((person, personIdx) => (
                          <tr
                            key={person.dni}
                            className={
                              personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td
                              style={{ padding: 10 }}
                              className="whitespace-nowrap"
                            >
                              <div className="relative flex flex-wrap items-center ">
                               
                                <Link
                                  style={{ marginLeft: 10 }}
                                  to={`/dashboard/payments/${person.id}`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  <PencilAltIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                    data-tip="Consultar"
                                  />
                                  <ReactTooltip />
                                </Link>
                                {rol == 1 && person.status == 0 && (<><Link
                                  style={{ marginLeft: 10 }}
                                  to={`/dashboard/payments/approve/${person.id}`}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <CheckIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                    data-tip="Aprobar"
                                  />
                                  <ReactTooltip />
                                </Link><Link
                                  style={{ marginLeft: 10 }}
                                  to={`/dashboard/payments/reject/${person.id}`}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <XIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                    data-tip="Rechazar"
                                  />
                                  <ReactTooltip />
                                </Link></>)}
                                <Link
                                  style={{ marginLeft: 10 }}
                                  onClick={() => {
                                    setPaymentId(person.id);
                                    setOpen(true);
                                  }}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <XCircleIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                    data-tip="Eliminar"
                                  />
                                  <ReactTooltip />
                                </Link>
                              </div>
                            </td>
                          
                            <td
                              style={{ width: 200 }}
                              className="px-6 py-4 text-sm font-medium text-gray-900"
                            >
                              {person.type == 1 ? "TRANSFERENCIA" : "EFECTIVO" }
                            </td>
                            <td
                              style={{ maxWidth: 200 }}
                              className="px-6 py-4  text-sm text-gray-500"
                            >
                              {person.fullname}
                            </td>
                            <td
                              style={{ width: 200 }}
                              className="px-6 py-4  text-sm text-gray-500"
                            >
                              {person.dni}
                            </td>
                            <td
                              style={{ width: 200 }}
                              className="px-6 py-4  text-sm text-gray-500"
                            >
                              {person.amount}
                            </td>
                            <td
                              style={{ width: 200 }}
                              className="px-6 py-4  text-sm text-gray-500"
                            >
                              {person.status == 0 ? "PENDIENTE": person.status==1 ?"APROBADO": "RECHAZADO"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      currentPage={currentPage}
                      postsPerPage={postsPerPage}
                      totalPosts={Payment.length}
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}
        >
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
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Eliminar Pago
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Esta seguro que desea eliminar la pago?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                    onClick={Delete}
                  >
                    Aceptar
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={error} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={error}
          onClose={setError}
        >
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
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
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
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Error!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        El pago esta involucrada en un proceso , por lo tanto
                        no puede eliminarse
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={async () => {
                      await setError(false);
                    }}
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
};

export default Payments;
