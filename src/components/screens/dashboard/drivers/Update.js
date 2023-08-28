import React, { useEffect, useRef, useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline';
import { GetOneDriver, UpdateDriver } from './../../../../helpers/apis/Driver';
import { UploadFile, GetOneImage, RemoveImage } from './../../../../helpers/apis/File';


const Update = (props) => {
    const navigation = useHistory();
    const [line, setLine] = useState('');
    const [plates, setPlates] = useState('');
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [ok, setOk] = useState(false);
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [msgE, setMessage] = useState('');

    const Phone = (e) => {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        const request = async () => {
            const response = await GetOneDriver(props.id);
            if (response.statusCode == 200) {
                setLine(response.data.transportLine);
                setName(response.data.fullname);
                setPhone(response.data.phone);
                setPlates(response.data.plates);
                setUserId(response.data.User.id);
            }
        };
        request();
    }, []);

    const update = async (e) => {
        e.preventDefault();
        if (name == "" || phone == "") {
            setEmpty(true);
        } else {
            const object = {
                transportLine: line,
                fullname: name,
                plates: plates,
                phone: phone,
                password: phone,
                username: phone,
                type: 2,
                confirm: phone,
                id: props.id,
                userId: userId,
                picture: ""
            };
            const response = await UpdateDriver(object);
            if (response.statusCode == 200) {
                setOk(true);
            } else if (response.statusCode == 409) {
                setMessage("el numero de telefono  ya se encuentra asignado a un conductor")
                setError(true);
            }
            else {
                setMessage(" Ocurrió un error al intentar actualizar el conductor, contacte al soporte técnico")
                setError(true);
            }
        }
    };

    return (
        <>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                <div className="mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <form className="space-y-8 divide-y divide-gray-200" onSubmit={update}>
                                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                        <div>
                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Editar conductor</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                    Rellena la información para actualizar el conductor
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Información de la cuenta</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Ingresa los datos de la cuenta</p>
                                            </div>
                                            <div className="space-y-6 sm:space-y-5">
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Nombre
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="first_name"
                                                            id="first_name"
                                                            onChange={(e) => { setName(e.target.value.toUpperCase()) }}
                                                            value={name}
                                                            autoComplete="given-name"
                                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Teléfono
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            id="phone"
                                                            name="phone"
                                                            type="text"
                                                            value={phone}
                                                            onKeyPress={(e) => { Phone(e) }}
                                                            onChange={(e) => { setPhone(e.target.value) }}
                                                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="plates" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Licencia
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="plates"
                                                            id="plates"
                                                            onChange={(e) => { setPlates(e.target.value.toUpperCase()) }}
                                                            value={plates}
                                                            autoComplete="given-name"
                                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div> 
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="line" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Documento de Identidad
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="line"
                                                            id="line"
                                                            onChange={(e) => { setLine(e.target.value.toUpperCase()) }}
                                                            value={line}
                                                            autoComplete="given-name"
                                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
                                                    navigation.push("/dashboard/drivers");
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
                                                El conductor ha sido actualizado con éxito
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={async () => { await setOk(false); navigation.push('/dashboard/drivers'); }}
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

export default Update;