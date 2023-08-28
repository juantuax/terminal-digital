import React, { useRef, useEffect, useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline';
import Preview from './../../../../assets/no-image.jpg';
import { GetCompanyProfile, UpdateCompany } from './../../../../helpers/apis/Company';
import { UpdateAdmin, GetAdminProfile } from './../../../../helpers/apis/Admin';
import { useSelector } from 'react-redux';
import { UploadFile, GetOneImage, RemoveImage } from './../../../../helpers/apis/File';
import { APP_SETTINGS } from './../../../../helpers/utils/Constants';

const Profile = () => {
    const navigation = useHistory();
    const rol = useSelector(state => state.auth.user.role);
    const id = useSelector(state => state.auth.user.id);
    const [dni, setDni] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneHome, setHomePhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [msgE, setMessage] = useState('');
    const [ok, setOk] = useState(false);
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [image, setImage] = useState("");
    const [imager, setRemove] = useState('');
    const images = useRef();

    useEffect(() => {
        const request = async () => {
            if (rol == 1) {
                const response = await GetAdminProfile(id);
                if (response.statusCode == 200) {
                    setDni(response.data.idNumber);
                    setName(response.data.fullname);
                    setUsername(response.data.User.username);
                    setPhone(response.data.phone);
                    setUserId(response.data.id);
                    const gotImage = await GetOneImage(response.data.User.id);
                    if (gotImage.statusCode == 200) {
                        setImage(APP_SETTINGS.IMG_URL + gotImage.data.path);
                        setRemove(gotImage.data.path);
                    }
                }
            } else if (rol == 3) {
                const response = await GetCompanyProfile(id);
                if (response.statusCode == 200) {
                    setDni(response.data.idNumber);
                    setName(response.data.fullname);
                    setHomePhone(response.data.homePhone);
                    setPhone(response.data.phone);
                    setAddress(response.data.address);
                    setUserId(response.data.id);
                    setUsername(response.data.User.username);
                    const gotImage = await GetOneImage(response.data.User.id);
                    if (gotImage.statusCode == 200) {
                        setImage(APP_SETTINGS.IMG_URL + gotImage.data.path);
                        setRemove(gotImage.data.path);
                    }
                }
            }

        };
        request();
    }, []);

    const uploadFile = async (file) => {
        const response = await UploadFile(file);
        return response;
    };

    const Phone = (e) => {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
        }
    };

    const ImagePreview = () => {
        let preview = URL.createObjectURL(images.current.files[0]);
        setImage(preview);
    };

    const HomePhone = (e) => {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
        }
    };

    const update = async (e) => {
        e.preventDefault();

        if (name == "" || dni == "" || phone == "" || username == "") {
            setEmpty(true);
        } else {
            let path = '';
            if (imager != '') {
                if (image !== (APP_SETTINGS.IMG_URL + imager)) {
                    if (images.current.files[0] != null) {
                        const filePath = await uploadFile(images.current.files[0]);
                        if (filePath.statusCode === 200) {
                            path = filePath.data;
                        }
                    }
                    let obj = { path: imager.slice(1, imager.lenght) };
                    const remove = await RemoveImage(obj);
                }
            } else {
                if (image !== (APP_SETTINGS.IMG_URL + imager)) {
                    if (images.current.files[0] != null) {
                        const filePath = await uploadFile(images.current.files[0]);
                        if (filePath.statusCode === 200) {
                            path = filePath.data;
                        }
                    }
                }
            }
            let object;
            if (rol == 1) {
                object = {
                    fullname: name,
                    dni: dni,
                    phone: phone,
                    password: password,
                    confirm: password,
                    username: username,
                    type: rol,
                    id: userId,
                    userId: id,
                    picture: path
                };
                const response = await UpdateAdmin(object);
                if (response.statusCode == 200) {
                    setOk(true);
                } else if (response.statusCode == 409) {
                    await setMessage("El usuario ya se encuentra asignado a un administradior")
                    setError(true);
                }
                else {
                    await setMessage("Ocurrió un error al intentar actualizar el administrador, contacte al soporte técnico")
                    setError(true);
                }
            } else if (rol == 3) {
                object = {
                    fullname: name,
                    dni: dni,
                    phone: phone,
                    homePhone: phoneHome,
                    address: address,
                    password: password,
                    username: username,
                    type: rol,
                    confirm: password,
                    id: userId,
                    userId: id,
                    picture: path
                };
                const response = await UpdateCompany(object);
                if (response.statusCode == 200) {
                    setOk(true);
                } else if (response.statusCode == 409) {
                    await setMessage("El usuario ya se encuentra asignado a una compañía")
                    setError(true);
                }
                else {
                    await setMessage("Ocurrió un error al intentar actualizar el compañía, contacte al soporte técnico")
                    setError(true);
                }
            }
        }
    };

    if (rol == 3) {
        return (
            <>
                <main className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
                        {/* Breadcrumb */}
                        <div className="flex-1 flex xl:overflow-hidden">
                            {/* Main content */}
                            <div className="flex-1 max-h-screen xl:overflow-y-auto">
                                <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                                    <h1 className="text-3xl font-extrabold text-blue-gray-900">Cuenta</h1>

                                    <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200" onSubmit={update}>
                                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                                            <div className="sm:col-span-6">
                                                <h2 className="text-xl font-medium text-blue-gray-900">Perfil</h2>
                                                <p className="mt-1 text-sm text-blue-gray-500">
                                                    Datos de tu cuenta
                                                </p>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="first_name" className="block text-sm font-medium text-blue-gray-900">
                                                    Usuario
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    value={username}
                                                    onChange={(e) => { setUsername(e.target.value.toUpperCase()) }}
                                                    className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label htmlFor="username" className="block text-sm font-medium text-blue-gray-900">
                                                    Contraseña
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        onChange={(e) => { setPassword(e.target.value) }}
                                                        className="flex-1 block w-full min-w-0 border-blue-gray-300 rounded-none rounded-r-md text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="photo" className="block text-sm font-medium text-blue-gray-900">
                                                    Foto
                                                </label>
                                                <div className="mt-1 flex items-center">
                                                    <img
                                                        className="inline-block h-12 w-12 rounded-full"
                                                        src={image == "" ? Preview : image}
                                                    />
                                                    <div className="ml-4 flex">
                                                        <div className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
                                                            <label
                                                                htmlFor="user_photo"
                                                                className="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
                                                            >
                                                                <span>Cambiar</span>
                                                                <span className="sr-only"> user photo</span>
                                                            </label>
                                                            <input
                                                                id="user_photo"
                                                                name="user_photo"
                                                                type="file"
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                                ref={images}
                                                                onChange={(e) => { ImagePreview() }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                                            <div className="sm:col-span-6">
                                                <h2 className="text-xl font-medium text-blue-gray-900">Información personal</h2>
                                                <p className="mt-1 text-sm text-blue-gray-500">
                                                    Datos personales del usuario
                                                </p>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="email_address" className="block text-sm font-medium text-blue-gray-900">
                                                    Nombre completo
                                                </label>
                                                <input
                                                    type="text"
                                                    name="fullname"
                                                    id="fullname"
                                                    value={name}
                                                    onChange={(e) => { setName(e.target.value.toUpperCase()) }}
                                                    className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="email_address" className="block text-sm font-medium text-blue-gray-900">
                                                    Número de identificación
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dni"
                                                    id="dni"
                                                    value={dni}
                                                    onChange={(e) => { setDni(e.target.value.toUpperCase()) }}
                                                    className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="phone_number" className="block text-sm font-medium text-blue-gray-900">
                                                    Teléfono
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    value={phone}
                                                    onKeyPress={(e) => { Phone(e) }}
                                                    onChange={(e) => { setPhone(e.target.value) }}
                                                    className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-blue-gray-900">
                                                    Teléfono fijo
                                                </label>
                                                <input
                                                    type="text"
                                                    name="homePhone"
                                                    id="homePhone"
                                                    value={phoneHome}
                                                    onKeyPress={(e) => { HomePhone(e) }}
                                                    onChange={(e) => { setHomePhone(e.target.value) }}
                                                    className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="description" className="block text-sm font-medium text-blue-gray-900">
                                                    Dirección
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        id="address"
                                                        name="address"
                                                        className="block w-full border-blue-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                        value={address}
                                                        onChange={(e) => { setAddress(e.target.value.toUpperCase()) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 flex justify-end">
                                            <button
                                                onClick={() => {
                                                    navigation.push("/dashboard")
                                                }}
                                                type="button"
                                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Volver
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Guardar
                                            </button>
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
                                                    El perfil ha sido actualizado con éxito
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                            onClick={async () => { await setOk(false); navigation.push('/dashboard'); }}
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
    } else if (rol == 1) {
        return (
            <>
                <main className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
                        {/* Breadcrumb */}
                        <div className="flex-1 flex xl:overflow-hidden">
                            {/* Main content */}
                            <div className="flex-1 max-h-screen xl:overflow-y-auto">
                                <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                                    <h1 className="text-3xl font-extrabold text-blue-gray-900">Cuenta</h1>

                                    <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200" onSubmit={update}>
                                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                                            <div className="sm:col-span-6">
                                                <h2 className="text-xl font-medium text-blue-gray-900">Perfil</h2>
                                                <p className="mt-1 text-sm text-blue-gray-500">
                                                    Datos de tu cuenta
                                                </p>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="first_name" className="block text-sm font-medium text-blue-gray-900">
                                                    Usuario
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    value={username}
                                                    onChange={(e) => { setUsername(e.target.value.toUpperCase()) }}
                                                    className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label htmlFor="username" className="block text-sm font-medium text-blue-gray-900">
                                                    Contraseña
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        onChange={(e) => { setPassword(e.target.value) }}
                                                        className="flex-1 block w-full min-w-0 border-blue-gray-300 rounded-none rounded-r-md text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="photo" className="block text-sm font-medium text-blue-gray-900">
                                                    Foto
                                                </label>
                                                <div className="mt-1 flex items-center">
                                                    <img
                                                        className="inline-block h-12 w-12 rounded-full"
                                                        src={image == "" ? Preview : image}
                                                    />
                                                    <div className="ml-4 flex">
                                                        <div className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
                                                            <label
                                                                htmlFor="user_photo"
                                                                className="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
                                                            >
                                                                <span>Cambiar</span>
                                                                <span className="sr-only"> user photo</span>
                                                            </label>
                                                            <input
                                                                id="user_photo"
                                                                name="user_photo"
                                                                type="file"
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                                ref={images}
                                                                onChange={(e) => { ImagePreview() }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                                            <div className="sm:col-span-6">
                                                <h2 className="text-xl font-medium text-blue-gray-900">Información personal</h2>
                                                <p className="mt-1 text-sm text-blue-gray-500">
                                                    Datos personales del usuario
                                                </p>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="email_address" className="block text-sm font-medium text-blue-gray-900">
                                                    Nombre completo
                                                </label>
                                                <input
                                                    type="text"
                                                    name="fullname"
                                                    id="fullname"
                                                    value={name}
                                                    onChange={(e) => { setName(e.target.value.toUpperCase()) }}
                                                    className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="email_address" className="block text-sm font-medium text-blue-gray-900">
                                                    Número de identificación
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dni"
                                                    id="dni"
                                                    value={dni}
                                                    onChange={(e) => { setDni(e.target.value.toUpperCase()) }}
                                                    className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="phone_number" className="block text-sm font-medium text-blue-gray-900">
                                                    Teléfono
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    value={phone}
                                                    onKeyPress={(e) => { Phone(e) }}
                                                    onChange={(e) => { setPhone(e.target.value) }}
                                                    className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-8 flex justify-end">
                                            <button
                                                onClick={() => {
                                                    navigation.push("/dashboard")
                                                }}
                                                type="button"
                                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Volver
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Guardar
                                            </button>
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
                                                    El perfil ha sido actualizado con éxito
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                            onClick={async () => { await setOk(false); navigation.push('/dashboard'); }}
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
}
export default Profile;
