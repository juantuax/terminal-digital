import React, { useEffect, useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline';
import { UpdateCompany, GetOneCompany } from '../../../../helpers/apis/Company';

const Update = (props) => {
    const navigation = useHistory();
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [model, setModel] = useState('');
    const [places, setPlaces] = useState('');
    const [msgE, setMessage] = useState('');
    const [ok, setOk] = useState(false);
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        const request = async () => {
            const response = await GetOneCompany(props.id);
            if (response.statusCode == 200) {
                setNumber(response.data.unityNumber);
                setName(response.data.unityName);
                setColor(response.data.color);
                setYear(response.data.year);
                setModel(response.data.model);
                setPlaces(response.data.unityPlaces);
            }
        };
        request();
    }, []);

    const Phone = (e) => {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
        }
    };

    const update = async (e) => {
        e.preventDefault();
        if (name == "" || number == "" || color == "" || year == "" || places == ""|| model== "") {
            setEmpty(true);
        } else {
            const object = {
                unityName: name,
                unityNumber: number,
                year: year,
                unityPlaces: places,
                model: model,
                color: color,
                id: props.id
            };
            const response = await UpdateCompany(object);
            if (response.statusCode == 200) {
                setOk(true);
            }
            else if (response.statusCode == 409) {
                await setMessage("El número de unidad ya se encuentra registrado a otro unidad")
                setError(true);
            }
            else {
                await setMessage("Ocurrió un error al intentar actualizar la unidad, contacte al soporte técnico")
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
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Unidad</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                    Rellena la información para actualizar la unidad
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Información de la unidad</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Ingresa los datos de la unidad</p>
                                            </div>
                                            <div className="space-y-6 sm:space-y-5">
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="id_number" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Número de Unidad
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="id_number"
                                                            id="id_number"
                                                            onChange={(e) => { setNumber(e.target.value.toUpperCase()) }}
                                                            value={number}
                                                            autoComplete="given-name"
                                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Placa
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
                                                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Modelo
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="model"
                                                            id="model"
                                                            onChange={(e) => { setModel(e.target.value.toUpperCase()) }}
                                                            value={model}
                                                            autoComplete="given-name"
                                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Año
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            id="year"
                                                            name="year"
                                                            type="text"
                                                            value={year}
                                                            onKeyPress={(e) => { Phone(e) }}
                                                            onChange={(e) => { setYear(e.target.value) }}
                                                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Color
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="color"
                                                            id="color"
                                                            onChange={(e) => { setColor(e.target.value.toUpperCase()) }}
                                                            value={color}
                                                            autoComplete="given-name"
                                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                       Capacidad de la Unidad
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            id="places"
                                                            name="places"
                                                            min={0}
                                                            type="number"
                                                            value={places}
                                                            onChange={(e) => { setPlaces(e.target.value) }}
                                                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                            required
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
                                                    navigation.push("/dashboard/companies");
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
                                                La terminal ha sido actualizado con éxito
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={async () => { await setOk(false); navigation.push('/dashboard/companies'); }}
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